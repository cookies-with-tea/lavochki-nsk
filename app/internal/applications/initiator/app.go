package initiator

import (
	"context"
	"errors"
	"fmt"
	"net"
	"net/http"
	"time"

	"benches/docs"
	_ "benches/docs"
	"benches/internal/config"
	"benches/internal/domain"
	benchesPolicy "benches/internal/policy/benches"
	botPolicy "benches/internal/policy/bot"
	commentsPolicy "benches/internal/policy/comments"
	reportsPolicy "benches/internal/policy/reports"
	tagsPolicy "benches/internal/policy/tags"
	usersPolicy "benches/internal/policy/users"
	minioStorage "benches/internal/repository/minio"
	benchesRepository "benches/internal/repository/postgres/benches"
	commentsRepository "benches/internal/repository/postgres/comments"
	reportsRepository "benches/internal/repository/postgres/reports"
	tagsRepository "benches/internal/repository/postgres/tags"
	usersRepository "benches/internal/repository/postgres/users"
	redisStorage "benches/internal/repository/redis"
	benchesService "benches/internal/service/benches"
	botService "benches/internal/service/bot"
	commentsService "benches/internal/service/comments"
	"benches/internal/service/notifications"
	reportsService "benches/internal/service/reports"
	tagsService "benches/internal/service/tags"
	usersService "benches/internal/service/users"
	"benches/internal/transport/httpv1/benches"
	"benches/internal/transport/httpv1/bot"
	"benches/internal/transport/httpv1/comments"
	"benches/internal/transport/httpv1/reports"
	"benches/internal/transport/httpv1/tags"
	"benches/internal/transport/httpv1/users"
	"benches/internal/transport/middlewares"
	"benches/pkg/auth"
	postgresClient "benches/pkg/client/postgres"
	"benches/pkg/maps"
	"benches/pkg/telegram"

	"github.com/go-redis/redis/v9"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/rs/cors"
	httpSwagger "github.com/swaggo/http-swagger"
	"go.uber.org/zap"
)

type App struct {
	cfg        *config.Config
	logger     *zap.Logger
	router     *mux.Router
	httpServer *http.Server
}

func NewApp(cfg *config.Config, logger *zap.Logger) (*App, error) {
	// TODO: Переделать router на chi.
	// TODO: Сделать логгирование запросов.
	// TODO: Разобраться со swagger'ом. Он почему-то не работает с nginx.
	// TODO: Разделить router для администратора и для обычного пользователя.

	logger.Info("router initializing")
	router := mux.NewRouter()
	router.Use(middlewares.Logging(logger))

	initSwagger(logger, router)

	db := initPostgreSQL(cfg, logger)

	minioClient := initMinio(cfg, logger)

	redisClient := initRedis(cfg, logger)

	authManager, err := auth.NewManager(cfg.SigningKey)
	if err != nil {
		logger.Fatal("init auth manager", zap.Error(err))
	}

	geoCoder := maps.NewYandexGeoCoder(cfg.Yandex.Token)

	var appNotificationsService notifications.Service
	if cfg.IsDevelopment {
		appNotificationsService = notifications.NewServiceMock(logger, cfg.Telegram.NotificationToken)
	} else {
		appNotificationsService = notifications.NewService(logger, cfg.Telegram.NotificationToken)
	}

	// TODO: Вынести инициализацию приложений куда-нибудь в "стратегии".

	// Теги
	appTagsRouter := router.PathPrefix("/api/v1/tags").Subrouter()
	appTagsRepository := tagsRepository.NewTagsRepository(db)
	appTagsService := tagsService.NewService(appTagsRepository, logger)
	appTagsPolicy := tagsPolicy.NewPolicy(appTagsService)
	appHandlerTags := tags.NewHandler(appTagsPolicy)
	appHandlerTags.Register(appTagsRouter)

	// Пользователи
	appUsersRedisStorage := redisStorage.NewRedisStorage(redisClient)
	appUsersTelegramManager := telegram.NewTelegramManager(cfg.Telegram.Token)
	appUsersRepository := usersRepository.NewUsersRepository(db)
	appUsersService := usersService.NewService(
		appUsersRepository,
		appUsersRedisStorage,
		authManager,
		appUsersTelegramManager,
		domain.CreateTokenLifetime(cfg.AppConfig.LifetimeAccessTokenMinutes, cfg.AppConfig.LifetimeRefreshTokenMinutes),
		logger,
	)
	appUsersPolicy := usersPolicy.NewPolicy(appUsersService)
	appHandlerUsers := users.NewHandler(appUsersPolicy)
	appHandlerUsers.Register(router, authManager)

	// Лавочки
	appBenchesRouter := router.PathPrefix("/api/v1/benches").Subrouter()
	appBenchesStorage := minioStorage.NewMinioStorage(minioClient, cfg.Minio.Bucket, cfg.Images.PublicEndpoint)
	appBenchesRepository := benchesRepository.NewBenchesRepository(db)
	appBenchesService := benchesService.NewService(appBenchesRepository, appBenchesStorage, logger)
	appBenchesPolicy := benchesPolicy.NewPolicy(
		appBenchesService,
		appUsersService,
		appNotificationsService,
		appTagsService,
		geoCoder,
		logger,
	)
	appHandlerBenches := benches.NewHandler(appBenchesPolicy)
	appHandlerBenches.Register(appBenchesRouter, authManager)

	// Бот
	appBotRouter := router.PathPrefix("/api/v1/bot").Subrouter()
	appBotService := botService.NewService(cfg.Telegram.Login, cfg.Telegram.Password,
		logger, authManager, appUsersRedisStorage)
	appBotPolicy := botPolicy.NewPolicy(appBotService)
	appBotHandler := bot.NewHandler(appBotPolicy)
	appBotHandler.Register(appBotRouter)

	// Комментарии
	appCommentsRouter := router.PathPrefix("/api/v1/comments").Subrouter()
	appCommentsRepository := commentsRepository.NewCommentsRepository(db)
	appCommentsService := commentsService.NewService(appCommentsRepository, logger)
	appCommentsPolicy := commentsPolicy.NewPolicy(appCommentsService, appUsersService)
	appHandlerComments := comments.NewHandler(appCommentsPolicy)
	appHandlerComments.Register(appCommentsRouter, authManager)

	// Жалобы
	appReportsRouter := router.PathPrefix("/api/v1/reports").Subrouter()
	appReportsRepository := reportsRepository.NewReportsRepository(db)
	appReportsService := reportsService.NewService(appReportsRepository, logger)
	appReportsPolicy := reportsPolicy.NewPolicy(appReportsService)
	appHandlerReports := reports.NewHandler(appReportsPolicy)
	appHandlerReports.Register(appReportsRouter, authManager)

	return &App{cfg: cfg, logger: logger, router: router}, nil
}

func (a *App) startHTTP() {
	a.logger.Info("start HTTP")

	var listener net.Listener

	a.logger.Info(fmt.Sprintf("bind application to host: %s and port: %s", a.cfg.Listen.BindIP, a.cfg.Listen.Port))
	var err error
	listener, err = net.Listen("tcp", fmt.Sprintf("%s:%s", a.cfg.Listen.BindIP, a.cfg.Listen.Port))
	if err != nil {
		a.logger.Fatal("", zap.Error(err))
	}

	// TODO: Вынести "AllowedOrigins" в .env.
	c := cors.New(cors.Options{
		AllowedMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPatch, http.MethodPut, http.MethodOptions, http.MethodDelete},
		AllowedOrigins:     []string{"http://localhost:3000", "http://localhost:8080"},
		AllowCredentials:   true,
		AllowedHeaders:     []string{"Location", "Charset", "Access-Control-Allow-Origin", "Content-Type", "content-type", "Origin", "Accept", "Content-Length", "Accept-Encoding", "X-CSRF-Token"},
		OptionsPassthrough: true,
		ExposedHeaders:     []string{"Location", "Authorization", "Content-Disposition"},
		Debug:              false,
	})

	handler := c.Handler(a.router)

	a.httpServer = &http.Server{
		Handler:      handler,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	a.logger.Info("application completely initialized and started")

	if err := a.httpServer.Serve(listener); err != nil {
		switch {
		case errors.Is(err, http.ErrServerClosed):
			a.logger.Warn("server shutdown")
		default:
			a.logger.Fatal("error run listener", zap.Error(err))
		}
	}
	err = a.httpServer.Shutdown(context.Background())
	if err != nil {
		a.logger.Fatal("", zap.Error(err))
	}
}

func (a *App) Run() {
	a.startHTTP()
}

func initPostgreSQL(cfg *config.Config, logger *zap.Logger) *pgxpool.Pool {
	logger.Info("database initializing")
	postgresConfig := postgresClient.NewConfig(
		cfg.PostgreSQL.Username, cfg.PostgreSQL.Password,
		cfg.PostgreSQL.Host, cfg.PostgreSQL.Port, cfg.PostgreSQL.Database)
	db, errInitPostgres := postgresClient.NewClient(context.Background(), 5, time.Second*5, postgresConfig)
	if errInitPostgres != nil {
		logger.Fatal("create postgres client", zap.Error(errInitPostgres))
	}

	return db
}

func initMinio(cfg *config.Config, logger *zap.Logger) *minio.Client {
	logger.Info("minio initializing")
	minioClient, err := minio.New(cfg.Minio.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(cfg.Minio.AccessKey, cfg.Minio.SecretKey, ""),
		Secure: false,
	})
	if err != nil {
		logger.Fatal("creating minio client", zap.Error(err))
	}
	err = minioClient.MakeBucket(context.Background(), cfg.Minio.Bucket, minio.MakeBucketOptions{
		Region:        "",
		ObjectLocking: false,
	})
	if err != nil {
		exists, errBucketExists := minioClient.BucketExists(context.Background(), cfg.Minio.Bucket)
		if errBucketExists == nil && exists {
			logger.Info("we already own", zap.String("bucket", cfg.Minio.Bucket))
		} else {
			logger.Fatal("run minio client: ", zap.Error(err))
		}
	}

	return minioClient
}

func initRedis(cfg *config.Config, logger *zap.Logger) *redis.Client {
	logger.Info("redis initializing")
	redisClient := redis.NewClient(&redis.Options{
		Addr:     cfg.Redis.Host,
		Password: cfg.Redis.Password,
		DB:       cfg.Redis.DB,
	})

	return redisClient
}

func initSwagger(logger *zap.Logger, router *mux.Router) {
	logger.Info("swagger initializing")

	docs.SwaggerInfo.Title = "Лавочки"
	docs.SwaggerInfo.BasePath = "/api/v1"
	docs.SwaggerInfo.Schemes = []string{"http", "https"}

	router.PathPrefix("/api/swagger").Handler(httpSwagger.WrapHandler)
}

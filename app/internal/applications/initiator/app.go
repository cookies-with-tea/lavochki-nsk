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
	"benches/internal/composites"
	"benches/internal/config"
	minioStorage "benches/internal/repository/minio"
	redisStorage "benches/internal/repository/redis"
	"benches/internal/transport/middlewares"
	postgresClient "benches/pkg/client/postgres"
	"benches/pkg/maps"

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
	// TODO: Сделать функционал "Ближайшие метро".

	logger.Info("router initializing")
	router := mux.NewRouter()
	router.Use(middlewares.Logging(logger))

	initSwagger(logger, router)

	db := initPostgreSQL(cfg, logger)

	minioClient := initMinio(cfg, logger)
	minioContainer := minioStorage.NewMinioStorage(minioClient, cfg.Minio.Bucket, cfg.Images.PublicEndpoint)

	redisClient := initRedis(cfg, logger)
	redisContainer := redisStorage.NewRedisStorage(redisClient)

	databases := composites.NewDatabaseComposite(db, redisContainer, minioContainer)

	managers, err := composites.NewManagerComposite(cfg.SigningKey, cfg.Telegram.Token)
	if err != nil {
		logger.Fatal("failed managers initializing", zap.Error(err))
	}

	geoCoder := maps.NewYandexGeoCoder(cfg.Yandex.Token)

	// Уведомления
	notificationsComposite := composites.NewNotificationComposite(cfg, logger)

	// Районы
	appDistrictsRouter := router.PathPrefix("/api/v1/public/districts").Subrouter()
	districtsComposite := composites.NewDistrictsComposite(databases, logger)
	districtsComposite.PublicHandler.Register(appDistrictsRouter)

	// Теги
	appTagsPrivateRouter := router.PathPrefix("/api/v1/private/tags").Subrouter()
	appTagsPublicRouter := router.PathPrefix("/api/v1/public/tags").Subrouter()
	tagsComposite := composites.NewTagComposite(databases, logger)
	tagsComposite.PublicHandler.Register(appTagsPublicRouter)
	tagsComposite.PrivateHandler.Register(appTagsPrivateRouter, managers.AuthManager)

	// Пользователи
	appUsersPrivateRouter := router.PathPrefix("/api/v1/private/users").Subrouter()
	appUsersPublicRouter := router.PathPrefix("/api/v1/public/users").Subrouter()
	usersComposite := composites.NewUserComposite(databases, managers, cfg, logger)
	usersComposite.PrivateHandler.Register(appUsersPrivateRouter, managers.AuthManager)
	usersComposite.PublicHandler.Register(appUsersPublicRouter)

	// Лавочки
	appBenchesPrivateRouter := router.PathPrefix("/api/v1/private/benches").Subrouter()
	appBenchesPublicRouter := router.PathPrefix("/api/v1/public/benches").Subrouter()
	benchesComposite := composites.NewBenchComposite(
		databases,
		usersComposite,
		notificationsComposite,
		tagsComposite,
		geoCoder,
		logger,
	)
	benchesComposite.PublicHandler.Register(appBenchesPublicRouter)
	benchesComposite.PrivateHandler.Register(appBenchesPrivateRouter, managers.AuthManager)

	// Бот
	appBotRouter := router.PathPrefix("/api/v1/bot").Subrouter()
	botComposite := composites.NewBotComposite(databases, managers, cfg, logger)
	botComposite.PublicHandler.Register(appBotRouter)

	// Комментарии
	appCommentsRouter := router.PathPrefix("/api/v1/comments").Subrouter()
	commentsComposite := composites.NewCommentComposite(databases, usersComposite, logger)
	commentsComposite.PrivateHandler.Register(appCommentsRouter, managers.AuthManager)
	commentsComposite.PublicHandler.Register(appCommentsRouter)

	// Жалобы
	appReportsRouter := router.PathPrefix("/api/v1/reports").Subrouter()
	reportsComposite := composites.NewReportComposite(databases, logger)
	reportsComposite.PrivateHandler.Register(appReportsRouter, managers.AuthManager)

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
		AllowedMethods: []string{
			http.MethodGet,
			http.MethodPost,
			http.MethodPatch,
			http.MethodPut,
			http.MethodOptions,
			http.MethodDelete,
		},
		AllowedOrigins:   a.cfg.Listen.AllowedOrigins,
		AllowCredentials: true,
		AllowedHeaders: []string{
			"Location",
			"Charset",
			"Access-Control-Allow-Origin",
			"Content-Type",
			"content-type",
			"Origin",
			"Accept",
			"Content-Length",
			"Accept-Encoding",
			"X-CSRF-Token",
		},
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
	postgresConfig := postgresClient.NewConfig(cfg.PostgreSQL.Username, cfg.PostgreSQL.Password, cfg.PostgreSQL.Host, cfg.PostgreSQL.Port, cfg.PostgreSQL.Database)
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
	docs.SwaggerInfo.Schemes = []string{"http", "https"}

	router.PathPrefix("/api/swagger").Handler(httpSwagger.WrapHandler)
}

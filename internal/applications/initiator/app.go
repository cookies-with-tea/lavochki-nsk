package initiator

import (
	_ "benches/docs"
	"benches/internal/config"
	"benches/internal/handlers/benches"
	"benches/internal/handlers/users"
	"benches/internal/repository/postgres"
	benchesService "benches/internal/service/benches"
	notificationsService "benches/internal/service/notifications"
	usersService "benches/internal/service/users"
	minioStorage "benches/internal/storage/minio"
	redisStorage "benches/internal/storage/redis"
	"benches/pkg/auth"
	"benches/pkg/database"
	"benches/pkg/telegram"
	"context"
	"errors"
	"fmt"
	"github.com/go-redis/redis/v9"
	"github.com/gorilla/mux"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/rs/cors"
	httpSwagger "github.com/swaggo/http-swagger"
	"github.com/uptrace/bun"
	"go.uber.org/zap"
	"net"
	"net/http"
	"time"
)

type App struct {
	cfg        *config.Config
	logger     *zap.Logger
	router     *mux.Router
	database   *bun.DB
	httpServer *http.Server
}

func NewApp(cfg *config.Config, logger *zap.Logger) (*App, error) {
	logger.Info("router init")
	router := mux.NewRouter()

	logger.Info("swagger docs initializing")
	router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

	db := postgres.NewPostgresDatabase(database.DatabaseParametersToDSN("postgres", cfg.PostgreSQL.Host,
		cfg.PostgreSQL.Database, cfg.PostgreSQL.Username, cfg.PostgreSQL.Password, false))
	logger.Info("create minio client")
	minioClient, err := minio.New(cfg.Minio.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(cfg.Minio.AccessKey, cfg.Minio.SecretKey, ""),
		Secure: false,
	})
	if err != nil {
		logger.Fatal("creating minio client: ", zap.Error(err))
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
	logger.Info("create redis client")
	redisClient := redis.NewClient(&redis.Options{
		Addr:     cfg.Redis.Host,
		Password: cfg.Redis.Password,
		DB:       cfg.Redis.DB,
	})

	authManager, err := auth.NewManager(cfg.SigningKey)
	if err != nil {
		logger.Fatal("init auth manager: ", zap.Error(err))
	}

	var appNotificationsService notificationsService.Service
	if cfg.IsDevelopment {
		appNotificationsService = notificationsService.NewServiceMock(logger, cfg.Telegram.NotificationToken)
	} else {
		appNotificationsService = notificationsService.NewService(logger, cfg.Telegram.NotificationToken)
	}

	appUsersRedisStorage := redisStorage.NewRedisStorage(redisClient)
	appUsersTelegramManager := telegram.NewTelegramManager(cfg.Telegram.Token)
	appUsersRepository := postgres.NewUsersRepository(db)
	appUsersService := usersService.NewService(appUsersRepository,
		appUsersRedisStorage, authManager, appUsersTelegramManager, logger)
	appHandlerUsers := users.NewUsersHandler(appUsersService)
	appHandlerUsers.Register(router)

	appBenchesRouter := router.PathPrefix("/api/v1/benches").Subrouter()
	appBenchesStorage := minioStorage.NewMinioStorage(minioClient, cfg.Minio.Bucket, cfg.Images.PublicEndpoint)
	appBenchesRepository := postgres.NewBenchesRepository(db)
	appBenchesService := benchesService.NewService(appBenchesRepository, appBenchesStorage, logger, appNotificationsService, appUsersRepository)
	appHandlerBenches := benches.NewBenchesHandler(appBenchesService)
	appHandlerBenches.Register(appBenchesRouter, authManager)

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

package internal

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"time"

	"benches/internal/config"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/cors"

	"benches/internal/adapters/primary/httpv1/middleware"
	userHandler "benches/internal/adapters/primary/httpv1/public/user"
	userRepository "benches/internal/adapters/secondary/repositories/postgres/user"
	userService "benches/internal/application/user"

	benchPrivateHandler "benches/internal/adapters/primary/httpv1/private/bench"
	benchPublicHandler "benches/internal/adapters/primary/httpv1/public/bench"
	benchRepository "benches/internal/adapters/secondary/repositories/postgres/bench"
	benchService "benches/internal/application/bench"

	districtHandler "benches/internal/adapters/primary/httpv1/public/district"
	districtRepository "benches/internal/adapters/secondary/repositories/postgres/district"
	districtService "benches/internal/application/district"

	"benches/pkg/auth"
	postgresClient "benches/pkg/client/postgres"
)

type App struct {
	cfg        *config.Config
	logger     *slog.Logger
	router     *chi.Mux
	httpServer *http.Server
}

func (app *App) Run() {
	app.startHTTP()
}

func NewApp(cfg *config.Config, logger *slog.Logger) *App {
	logger.Info("router initializing")

	db := initPostgreSQL(cfg, logger)
	initMinio()
	initRedis()

	tokenManager, err := initTokenManager(cfg)
	if err != nil {
		logger.Error("failed init token manager", slog.Any("error", err))
		return nil
	}

	router := chi.NewRouter()
	router.Use(middleware.Logging(logger))

	appUserRepository := userRepository.NewRepository(db)
	appUserService := userService.NewService(logger, appUserRepository, tokenManager)
	appUserHandler := userHandler.NewHandler(appUserService)

	appBenchRepository := benchRepository.NewRepository(db)
	appBenchService := benchService.NewService(logger, appBenchRepository)
	appBenchPrivateHandler := benchPrivateHandler.NewHandler(appBenchService)
	appBenchPublicHandler := benchPublicHandler.NewHandler(appBenchService)

	appDistrictRepository := districtRepository.NewRepository(db)
	appDistrictService := districtService.NewService(logger, appDistrictRepository)
	appDistrictHandler := districtHandler.NewHandler(appDistrictService)

	router.Route("/api/v1/public/users", appUserHandler.Register)
	router.Route("/api/v1/private/benches", appBenchPrivateHandler.Register)
	router.Route("/api/v1/public/benches", appBenchPublicHandler.Register)
	router.Route("/api/v1/public/districts", appDistrictHandler.Register)

	return &App{cfg: cfg, logger: logger, router: router}
}

func initPostgreSQL(cfg *config.Config, logger *slog.Logger) *pgxpool.Pool {
	logger.Info("database initializing")

	postgresConfig := postgresClient.NewConfig(
		cfg.PostgreSQL.Username,
		cfg.PostgreSQL.Password,
		cfg.PostgreSQL.Host,
		cfg.PostgreSQL.Port,
		cfg.PostgreSQL.Database,
	)

	pool, err := postgresClient.NewClient(context.Background(), 5, time.Second*5, postgresConfig)
	if err != nil {
		logger.Error("failed create postgres client", "error", err)
	}

	return pool
}

func initMinio() {}
func initRedis() {}
func initTokenManager(cfg *config.Config) (auth.TokenManager, error) {
	manager, err := auth.NewManager(cfg.SigningKey)
	if err != nil {
		return nil, err
	}

	return manager, nil
}

func (app *App) startHTTP() {
	app.logger.Info("start HTTP")

	var listener net.Listener

	app.logger.Info(fmt.Sprintf("bind application to host: %s and port: %s", app.cfg.Listen.BindIP, app.cfg.Listen.Port))
	var err error
	listener, err = net.Listen("tcp", fmt.Sprintf("%s:%s", app.cfg.Listen.BindIP, app.cfg.Listen.Port))
	if err != nil {
		app.logger.Error("")
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
		AllowedOrigins:   app.cfg.Listen.AllowedOrigins,
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

	handler := c.Handler(app.router)

	app.httpServer = &http.Server{
		Handler:      handler,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	app.logger.Info("application completely initialized and started")

	if err := app.httpServer.Serve(listener); err != nil {
		switch {
		case errors.Is(err, http.ErrServerClosed):
			app.logger.Warn("server shutdown")
		default:
			app.logger.Error("error run listener")
		}
	}
	err = app.httpServer.Shutdown(context.Background())
	if err != nil {
		app.logger.Error("")
	}
}

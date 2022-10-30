package bot

import (
	"benches/internal/config"
	"benches/internal/domain"
	"benches/internal/repository/postgres"
	"benches/pkg/database"
	"context"
	"flag"
	"github.com/uptrace/bun"
	"go.uber.org/zap"
)

type App struct {
	cfg      *config.Config
	logger   *zap.Logger
	database *bun.DB
}

func NewApp(cfg *config.Config, logger *zap.Logger) (*App, error) {
	logger.Info("database initializing")
	db := postgres.NewPostgresDatabase(database.DatabaseParametersToDSN("postgres", cfg.PostgreSQL.Host,
		cfg.PostgreSQL.Database, cfg.PostgreSQL.Username, cfg.PostgreSQL.Password, false))

	username := flag.String("username", "admin", "Enter username bot")
	telegramID := flag.Int("tg_id", 0, "Enter tg_id bot")

	flag.Parse()

	appUsersRepository := postgres.NewUsersRepository(db)

	user := domain.User{
		Username:   *username,
		TelegramID: *telegramID,
		Role:       "bot",
	}
	appUsersRepository.CreateUser(context.TODO(), user)
	return &App{
		cfg:      cfg,
		logger:   logger,
		database: db,
	}, nil
}

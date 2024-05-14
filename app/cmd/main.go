package main

import (
	"benches/internal"
	"benches/internal/config"
	"benches/pkg/migrations"
	"fmt"
	"log/slog"
	"os"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	logger.Info("config initializing")
	cfg := config.GetConfig()

	migrateManager := migrations.NewManager(fmt.Sprintf(
		"postgresql://%s:%s@%s:%s/%s?sslmode=%s",
		cfg.PostgreSQL.Username, cfg.PostgreSQL.Password,
		cfg.PostgreSQL.Host, cfg.PostgreSQL.Port, cfg.PostgreSQL.Database, "disable",
	))
	err := migrateManager.Migrate()
	if err != nil {
		logger.Error("failed migrate", slog.Any("error", err))
		return
	}

	app := internal.NewApp(cfg, logger)

	logger.Info("running application")
	app.Run()
}

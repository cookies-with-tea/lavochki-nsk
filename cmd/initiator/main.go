package main

import (
	"benches/internal/applications/initiator"
	"benches/internal/config"
	"benches/pkg/database"
	"benches/pkg/logging"
	"benches/pkg/migrations"
	"fmt"
	"go.uber.org/zap"
)

func main() {
	logger, err := zap.NewProduction()

	if err != nil {
		fmt.Errorf("failed to create logger: %v", err)
	}
	defer logger.Sync() // nolint:errcheck
	appLogger := logging.NewLogger(logger, "benches")
	logger.Info("init config")
	cfg := config.GetConfig()
	migrateManager := migrations.NewManager(database.DatabaseParametersToDSN("postgres", cfg.PostgreSQL.Host,
		cfg.PostgreSQL.Database, cfg.PostgreSQL.Username, cfg.PostgreSQL.Password, false))
	err = migrateManager.Migrate()
	if err != nil {
		logger.Fatal("migrate: ", zap.Error(err))
	}
	a, err := initiator.NewApp(cfg, appLogger)
	if err != nil {
		appLogger.Fatal("Error create app", zap.Error(err))
	}
	logger.Info("Running Application")
	a.Run()
}

package main

import (
	"benches/internal/applications/initiator"
	"benches/internal/config"
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
	defer logger.Sync() //nolint:errcheck
	appLogger := logging.NewLogger(logger, "benches")
	logger.Info("config initializing")
	cfg := config.GetConfig()
	migrateManager := migrations.NewManager(fmt.Sprintf(
		"postgresql://%s:%s@%s:%s/%s?sslmode=%s",
		cfg.PostgreSQL.Username, cfg.PostgreSQL.Password,
		cfg.PostgreSQL.Host, cfg.PostgreSQL.Port, cfg.PostgreSQL.Database, "disable",
	))

	err = migrateManager.Migrate()
	if err != nil {
		logger.Fatal("migrate: ", zap.Error(err))
	}
	a, err := initiator.NewApp(cfg, appLogger)
	if err != nil {
		appLogger.Fatal("Error create app", zap.Error(err))
	}
	logger.Info("running application")
	a.Run()
}

package main

import (
	"benches/internal/applications/bot"
	"benches/internal/config"
	"benches/pkg/logging"
	"fmt"
	"go.uber.org/zap"
)

func main() {
	logger, err := zap.NewProduction()
	if err != nil {
		fmt.Errorf("failed to create logger: %v", err)
	}

	defer logger.Sync() // nolint:errcheck

	cfg := config.GetConfig()
	appLogger := logging.NewLogger(logger, "bot")
	_, err = bot.NewApp(cfg, appLogger)
	if err != nil {
		appLogger.Fatal("error create app", zap.Error(err))
	}
	logger.Info("running application")
}

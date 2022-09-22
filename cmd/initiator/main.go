package main

import (
	"benches-bot/internal"
	"benches-bot/internal/config"
	"benches-bot/pkg/logging"
	"fmt"
	"go.uber.org/zap"
)

func main() {
	logger, err := zap.NewProduction()
	if err != nil {
		fmt.Errorf("failed to create logger: %v", err)
	}
	defer logger.Sync()

	appLogger := logging.NewLogger(logger, "benches-bot")
	logger.Info("init config")
	cfg := config.GetConfig()
	initiator, err := internal.NewApp(appLogger, cfg)
	if err != nil {
		logger.Error("error new app", zap.Error(err))
	}
	initiator.Run()
}

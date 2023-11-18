package logging

import "go.uber.org/zap"

func NewLogger(logger *zap.Logger, serviceName string) *zap.Logger {
	return logger.Named(serviceName)
}

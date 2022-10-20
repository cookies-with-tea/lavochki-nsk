package notifications

import (
	"context"
	"go.uber.org/zap"
)

type ServiceMock struct {
	log                     *zap.Logger
	telegramNotificationURL string
}

func NewServiceMock(log *zap.Logger, telegramNotificationURL string) *ServiceMock {
	return &ServiceMock{
		log:                     log,
		telegramNotificationURL: telegramNotificationURL,
	}
}

func (s *ServiceMock) SendNotificationInTelegram(ctx context.Context, typeNotification string, userID int, benchID string) error {
	s.log.Info("Send message to telegram", zap.String("notification", typeNotification),
		zap.Int("user", userID), zap.String("bench", benchID))
	return nil
}

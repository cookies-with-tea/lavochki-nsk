package notifications

import (
	"benches/internal/notifications"
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

func (s *ServiceMock) SendNotificationInTelegram(ctx context.Context, notification *notifications.TelegramNotification) error {
	s.log.Info("Send message to telegram", zap.String("notification", notification.Message),
		zap.Int("user", notification.UserID))
	return nil
}

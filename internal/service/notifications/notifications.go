package notifications

import (
	"benches/internal/notifications"
	"bytes"
	"context"
	"encoding/json"
	"net/http"

	"go.uber.org/zap"
)

type Service interface {
	SendNotificationInTelegram(ctx context.Context, notification *notifications.TelegramNotification) error
}

type service struct {
	log                     *zap.Logger
	telegramNotificationURL string
}

func NewService(log *zap.Logger, telegramNotificationURL string) Service {
	return &service{
		log:                     log,
		telegramNotificationURL: telegramNotificationURL,
	}
}

// Отправка уведомления пользователю в Telegram
func (s *service) SendNotificationInTelegram(ctx context.Context, notification *notifications.TelegramNotification) error {
	jsonBody, _ := json.Marshal(notification)

	// Отправляем запрос на endpoint бота
	_, err := http.Post(s.telegramNotificationURL, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		return err
	}
	return nil
}

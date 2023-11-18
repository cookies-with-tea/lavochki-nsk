package notifications

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"

	"benches/internal/domain"

	"go.uber.org/zap"
)

type Service interface {
	SendNotificationInTelegram(ctx context.Context, notification *domain.TelegramNotification) error
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

// SendNotificationInTelegram Отправка уведомления пользователю в Telegram
func (service *service) SendNotificationInTelegram(ctx context.Context, notification *domain.TelegramNotification) error {
	jsonBody, _ := json.Marshal(notification)

	// Отправляем запрос на endpoint бота
	_, err := http.Post(service.telegramNotificationURL, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		return err
	}
	return nil
}

package notifications

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"go.uber.org/zap"
	"net/http"
)

type Service interface {
	SendNotificationInTelegram(ctx context.Context, typeNotification string, userID int, benchID string)
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

// Отправляем сообщение пользователю в Telegram
func (s *service) SendNotificationInTelegram(ctx context.Context, typeNotification string, userID int, benchID string) {
	// TODO: Избавиться от benchID

	var message string
	switch typeNotification {
	case "received":
		message = fmt.Sprintf("Лавочка `%s` успешно одобрена!", benchID)
	case "denied":
		message = fmt.Sprintf("Лавочка `%s` успешно отказана :(", benchID)
	}

	data := struct {
		UserID  int    `json:"user_id"`
		Message string `json:"message"`
	}{UserID: userID, Message: message}
	jsonBody, _ := json.Marshal(data)

	// Отправляем запрос на endpoint бота
	http.Post(s.telegramNotificationURL, "application/json", bytes.NewBuffer(jsonBody))
}

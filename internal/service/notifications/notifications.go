package notifications

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"go.uber.org/zap"
	"net/http"
)

type Service struct {
	log                     *zap.Logger
	telegramNotificationURL string
}

func NewService(log *zap.Logger, telegramNotificationURL string) *Service {
	return &Service{
		log:                     log,
		telegramNotificationURL: telegramNotificationURL,
	}
}

// Отправляем сообщение пользователю в Telegram
func (s *Service) SendNotificationInTelegram(ctx context.Context, typeNotification string, userID int, benchID string) {
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

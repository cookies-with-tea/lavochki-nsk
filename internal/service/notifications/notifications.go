package notifications

import (
	"bytes"
	"context"
	"encoding/json"
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

func (s *Service) SendNotificationInTelegram(ctx context.Context, typeNotification string, userID int) {
	data := struct {
		UserID int    `json:"user_id"`
		Type   string `json:"type"`
	}{UserID: 811495961, Type: "create_bench"}
	jsonBody, _ := json.Marshal(data)
	http.Post(s.telegramNotificationURL, "application/json", bytes.NewBuffer(jsonBody))
}

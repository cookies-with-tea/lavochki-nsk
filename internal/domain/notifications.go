package domain

import (
	"bytes"
	"text/template"
)

var (
	BenchSuccessfullyAccepted = NewTelegramNotificationTemplate("Лавочка {{.BenchID}} успешно одобрена!")
	BenchDenied               = NewTelegramNotificationTemplate("Лавочка {{.BenchID}} отказана!")
)

type TelegramNotification struct {
	Message string `json:"message"`
	UserID  int    `json:"user_id"`
}

type TelegramNotificationTemplate struct {
	MessageTemplate string
}

func NewTelegramNotification(message string, userID int) *TelegramNotification {
	return &TelegramNotification{
		Message: message,
		UserID:  userID,
	}
}

func NewTelegramNotificationTemplate(messageTemplate string) *TelegramNotificationTemplate {
	return &TelegramNotificationTemplate{
		MessageTemplate: messageTemplate,
	}
}

func (notification *TelegramNotificationTemplate) ToNotification(userID int, benchID string) (*TelegramNotification, error) {
	var buf bytes.Buffer

	messageTemplate := template.New("")
	_, errParse := messageTemplate.Parse(notification.MessageTemplate)
	if errParse != nil {
		return nil, errParse
	}
	errExecute := messageTemplate.Execute(&buf, struct {
		BenchID string
	}{BenchID: benchID})
	if errExecute != nil {
		return nil, errExecute
	}

	return NewTelegramNotification(buf.String(), userID), nil
}

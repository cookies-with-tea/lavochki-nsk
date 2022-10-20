package domain

type TelegramNotification struct {
	UserID  int    `json:"user_id"`
	Message string `json:"message"`
}

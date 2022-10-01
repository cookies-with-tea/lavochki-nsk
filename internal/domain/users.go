package domain

type User struct {
	ID         string `json:"id"`
	Username   string `json:"username"`
	TelegramID int    `json:"telegram_id"`
}

package dto

type CreateNotification struct {
	UserID int64  `json:"user_id"`
	Type   string `json:"type"`
}

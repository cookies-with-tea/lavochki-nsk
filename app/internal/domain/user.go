package domain

import "log/slog"

type Role string

const (
	UserRole      Role = "user"
	ModeratorRole Role = "moderator"
	AdminRole     Role = "admin"
)

type User struct {
	ID         string
	Username   string
	TelegramID int
	Role       string
}

func (user *User) LogValue() slog.Value {
	return slog.GroupValue(
		slog.String("id", user.ID),
		slog.String("username", user.Username),
		slog.Int("telegram_id", user.TelegramID),
		slog.String("role", user.Role),
	)
}

type TelegramUser struct {
	ID        int
	FirstName string
	LastName  string
	Username  string
	PhotoUrl  string
	AuthDate  int
	Hash      string
}

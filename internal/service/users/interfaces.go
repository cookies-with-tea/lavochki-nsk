package users

import (
	"benches/internal/domain"
	"context"
)

type Database interface {
	GetUserByTelegramID(ctx context.Context, telegramID int) (domain.User, error)
	CreateUser(ctx context.Context, user domain.User) (domain.User, error)
}

package users

import (
	"benches/internal/domain"
	"context"
)

type Database interface {
	GetUserByTelegramID(ctx context.Context, telegramID int) (domain.User, error)
	CreateUser(ctx context.Context, user domain.User) (domain.User, error)
	GetUserByID(ctx context.Context, id string) (domain.User, error)
}

type RedisStorage interface {
	WriteRefreshToken(ctx context.Context, refreshToken string, userID string) error
	GetRefreshToken(ctx context.Context, userID string) (string, error)
}

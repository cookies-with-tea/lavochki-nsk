package user

import (
	"benches/internal/domain"
	"context"
	"time"
)

type Repository interface {
	Create(context.Context, *domain.User) (*domain.User, error)
	ByTelegramID(context.Context, int) (*domain.User, error)
}

type CacheRepository interface {
	CreateRefreshToken(context.Context, string, string, time.Duration) error
	UserIDByRefreshToken(context.Context, string) (string, error)
}

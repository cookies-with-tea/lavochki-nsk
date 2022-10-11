package users

import (
	"benches/internal/dto"
	"context"
)

type Service interface {
	LoginViaTelegram(ctx context.Context, dto dto.CreateUser) (string, string, error)
	RefreshToken(ctx context.Context, token string) (string, string, error)
}

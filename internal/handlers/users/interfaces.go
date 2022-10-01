package users

import (
	"benches/internal/dto"
	"context"
)

type Service interface {
	LoginViaTelegram(ctx context.Context, dto dto.CreateUser) (string, error)
}

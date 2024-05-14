package bench

import (
	"benches/internal/domain"
	"context"
)

type Repository interface {
	Create(context.Context, *domain.Bench) (*domain.Bench, error)
	All(context.Context) ([]*domain.Bench, error)
}

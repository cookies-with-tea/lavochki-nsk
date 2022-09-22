package benches

import (
	"benches/internal/domain"
	"context"
)

type Database interface {
	GetBenches(ctx context.Context) ([]domain.Bench, error)
}

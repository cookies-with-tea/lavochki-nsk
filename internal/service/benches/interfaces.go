package benches

import (
	"benches/internal/domain"
	"context"
)

type Database interface {
	GetBenches(ctx context.Context) ([]domain.Bench, error)
	CreateBench(ctx context.Context, bench domain.Bench) error
}

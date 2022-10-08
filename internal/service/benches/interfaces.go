package benches

import (
	"benches/internal/domain"
	"context"
)

type Database interface {
	GetBenches(ctx context.Context, isActive bool) ([]domain.Bench, error)
	CreateBench(ctx context.Context, bench domain.Bench) error
	UpdateActiveBench(ctx context.Context, id string, decision bool) error
}

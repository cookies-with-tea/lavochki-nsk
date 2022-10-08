package benches

import (
	"benches/internal/domain"
	"benches/internal/dto"
	"context"
)

type Service interface {
	GetListBenches(ctx context.Context, isActive bool) ([]domain.Bench, error)
	CreateBench(ctx context.Context, bench dto.CreateBench) error
	DecisionBench(ctx context.Context, decisionBench dto.DecisionBench) error
}

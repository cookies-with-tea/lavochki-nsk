package benches

import (
	"benches/internal/domain"
	"context"
)

type Service interface {
	GetListBenches(ctx context.Context) ([]domain.Bench, error)
}

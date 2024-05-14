package district

import (
	"benches/internal/domain"
	"context"
)

type Repository interface {
	All(ctx context.Context) ([]*domain.District, error)
}

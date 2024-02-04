package districts

import (
	"context"

	"benches/internal/domain"
)

type Service interface {
	GetAllDistricts(ctx context.Context) ([]*domain.District, error)
}

package districts

import (
	"benches/internal/domain"

	"golang.org/x/net/context"
)

type Repository interface {
	All(ctx context.Context) ([]*domain.District, error)
}

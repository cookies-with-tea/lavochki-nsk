package districts

import (
	"context"

	"benches/internal/domain"

	"go.uber.org/zap"
)

type Policy struct {
	districtsService Service
	logger           *zap.Logger
}

func NewPolicy(districtsService Service, logger *zap.Logger) *Policy {
	return &Policy{districtsService: districtsService, logger: logger}
}

func (policy *Policy) GetAllDistricts(ctx context.Context) ([]*domain.District, error) {
	return policy.districtsService.GetAllDistricts(ctx)
}

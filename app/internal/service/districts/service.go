package districts

import (
	"benches/internal/domain"

	"go.uber.org/zap"
	"golang.org/x/net/context"
)

type Service struct {
	db  Repository
	log *zap.Logger
}

func NewService(db Repository, log *zap.Logger) *Service {
	return &Service{db: db, log: log}
}

func (service *Service) GetAllDistricts(ctx context.Context) ([]*domain.District, error) {
	list, err := service.db.All(ctx)
	if err != nil {
		service.log.Error("error get all districts", zap.Error(err))
		return nil, err
	}

	return list, nil
}

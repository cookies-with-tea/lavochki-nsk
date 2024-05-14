package district

import (
	"benches/internal/domain"
	"context"
	"log/slog"
)

type Service struct {
	logger     *slog.Logger
	repository Repository
}

func NewService(logger *slog.Logger, repository Repository) *Service {
	return &Service{
		logger:     logger,
		repository: repository,
	}
}

func (service *Service) GetAllDistricts(ctx context.Context) ([]*domain.District, error) {
	all, err := service.repository.All(ctx)
	if err != nil {
		service.logger.Error("failed get all districts", slog.Any("error", err))
		return nil, err
	}

	return all, nil
}

package bench

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

func (service *Service) CreateBench(ctx context.Context, bench *domain.Bench) (*domain.Bench, error) {
	newBench, err := service.repository.Create(ctx, bench)
	if err != nil {
		service.logger.Error(
			"failed create new bench",
			slog.Any("error", err),
			slog.Any("bench", bench),
		)
		return nil, err
	}

	return newBench, err
}

func (service *Service) GetAllBenches(ctx context.Context) ([]*domain.Bench, error) {
	all, err := service.repository.All(ctx)
	if err != nil {
		service.logger.Error(
			"failed get all benches",
			slog.Any("error", err),
		)
		return nil, err
	}

	return all, nil
}

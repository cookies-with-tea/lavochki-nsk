package tags

import (
	"benches/internal/domain"
	"benches/internal/repository/postgres"
	"context"
	"go.uber.org/zap"
)

type Service interface {
	All(ctx context.Context) ([]domain.Tag, error)
	Create(ctx context.Context, tag domain.Tag) error
}

type service struct {
	db  postgres.TagsRepository
	log *zap.Logger
}

func NewService(db postgres.TagsRepository, log *zap.Logger) Service {
	return &service{
		db:  db,
		log: log,
	}
}

func (s *service) All(ctx context.Context) ([]domain.Tag, error) {
	tags, err := s.db.All(ctx)
	if err != nil {
		return []domain.Tag{}, err
	}
	return tags, nil
}

func (s *service) Create(ctx context.Context, tag domain.Tag) error {
	if err := s.db.Create(ctx, tag); err != nil {
		return err
	}
	return nil
}

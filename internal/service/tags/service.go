package tags

import (
	"benches/internal/domain"
	"benches/internal/repository/postgres"
	"context"
	"go.uber.org/zap"
)

type Service interface {
	GetAllTags(ctx context.Context) ([]domain.Tag, error)
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

func (s *service) GetAllTags(ctx context.Context) ([]domain.Tag, error) {
	tags, err := s.db.GetAllTags(ctx)
	if err != nil {
		return []domain.Tag{}, err
	}
	return tags, nil
}

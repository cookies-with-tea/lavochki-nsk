package tags

import (
	"benches/internal/domain"
	"benches/internal/repository/postgres/tags"
	"context"
	"go.uber.org/zap"
)

type Service interface {
	GetAllTags(ctx context.Context) ([]*domain.Tag, error)
	CreateTag(ctx context.Context, tag domain.Tag) error
	AddTagToBench(ctx context.Context, tagBench domain.TagBench) error
}

type service struct {
	db  tags.Repository
	log *zap.Logger
}

func NewService(db tags.Repository, log *zap.Logger) Service {
	return &service{
		db:  db,
		log: log,
	}
}

func (service *service) GetAllTags(ctx context.Context) ([]*domain.Tag, error) {
	all, err := service.db.All(ctx)
	if err != nil {
		return nil, err
	}
	return all, nil
}

func (service *service) CreateTag(ctx context.Context, tag domain.Tag) error {
	if err := service.db.Create(ctx, tag); err != nil {
		return err
	}
	return nil
}

func (service *service) AddTagToBench(ctx context.Context, tagBench domain.TagBench) error {
	return service.db.CreateTagToBench(ctx, tagBench)
}

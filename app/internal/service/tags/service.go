package tags

import (
	"context"

	"benches/internal/domain"
	"benches/internal/repository/postgres/tags"

	"go.uber.org/zap"
)

type Service interface {
	GetAllTags(ctx context.Context) ([]*domain.Tag, error)
	CreateTag(ctx context.Context, tag domain.Tag) error
	AddTagToBench(ctx context.Context, tagBench domain.TagBench) error
	DeleteByBench(ctx context.Context, benchID string) error
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

// AddTagToBench Удаление тега к лавочке.
func (service *service) AddTagToBench(ctx context.Context, tagBench domain.TagBench) error {
	errCreateTag := service.db.CreateTagToBench(ctx, tagBench)
	if errCreateTag != nil {
		service.log.Error("failed create tag to bench", zap.String("bench id", tagBench.BenchID),
			zap.String("tag id", tagBench.TagID), zap.Error(errCreateTag))
		return errCreateTag
	}

	return nil
}

// DeleteByBench Удаление тегов по лавочки.
func (service *service) DeleteByBench(ctx context.Context, benchID string) error {
	// Удаляем теги, которые привязаны к данному пользователю
	errDelete := service.db.DeleteByBench(ctx, benchID)
	if errDelete != nil {
		service.log.Error("failed delete all tags", zap.String("bench id", benchID), zap.Error(errDelete))
		return errDelete
	}
	return nil
}

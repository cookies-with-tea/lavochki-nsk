package postgres

import (
	"benches/internal/domain"
	"context"
	"github.com/uptrace/bun"
)

type TagsRepository interface {
	GetAllTags(ctx context.Context) ([]domain.Tag, error)
}

type tagsRepository struct {
	db *bun.DB
}

func NewTagsRepository(db *bun.DB) TagsRepository {
	return &tagsRepository{
		db: db,
	}
}

func (t *tagsRepository) GetAllTags(ctx context.Context) ([]domain.Tag, error) {
	tagsModel := make([]tagModel, 0)
	err := t.db.NewSelect().Model(&tagsModel).Scan(ctx)
	if err != nil {
		return nil, err
	}
	tags := tagModelsToDomain(tagsModel)
	return tags, nil
}

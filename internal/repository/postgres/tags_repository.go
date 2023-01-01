package postgres

import (
	"benches/internal/domain"
	"context"
	"github.com/oklog/ulid/v2"
	"github.com/uptrace/bun"
)

type TagsRepository interface {
	All(ctx context.Context) ([]domain.Tag, error)
	Create(ctx context.Context, tag domain.Tag) error
}

type tagsRepository struct {
	db *bun.DB
}

func NewTagsRepository(db *bun.DB) TagsRepository {
	return &tagsRepository{
		db: db,
	}
}

func (t *tagsRepository) All(ctx context.Context) ([]domain.Tag, error) {
	tagsModel := make([]tagModel, 0)
	err := t.db.NewSelect().Model(&tagsModel).Scan(ctx)
	if err != nil {
		return nil, err
	}
	tags := tagModelsToDomain(tagsModel)
	return tags, nil
}

func (t *tagsRepository) Create(ctx context.Context, tag domain.Tag) error {
	model := tagModel{}
	model.FromDomain(tag)
	model.ID = ulid.Make().String()
	_, err := t.db.NewInsert().Model(&model).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

package postgres

import (
	"benches/internal/domain"
	"github.com/uptrace/bun"
)

type tagModel struct {
	bun.BaseModel `bun:"table:tags,alias:tags,select:tags"`

	ID    string `bun:"id,pk"`
	Title string `bun:"title"`
}

func (t *tagModel) FromDomain(tag domain.Tag) {
	t.ID = tag.ID
	t.Title = tag.Title
}

func tagModelToDomain(model tagModel) domain.Tag {
	return domain.Tag{
		ID:    model.ID,
		Title: model.Title,
	}
}

func tagModelsToDomain(models []tagModel) []domain.Tag {
	tags := make([]domain.Tag, 0, len(models))
	for _, model := range models {
		tags = append(tags, tagModelToDomain(model))
	}
	return tags
}

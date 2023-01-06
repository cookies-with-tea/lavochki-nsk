package tags

import (
	"benches/internal/domain"
	"github.com/mitchellh/mapstructure"
)

type tagModel struct {
	ID    string
	Title string
}

func (tag *tagModel) FromDomain(tagDomain domain.Tag) {
	tag.ID = tagDomain.ID
	tag.Title = tagDomain.Title
}

func tagModelToDomain(model tagModel) domain.Tag {
	return domain.Tag{
		ID:    model.ID,
		Title: model.Title,
	}
}

func (tag *tagModel) ToMap() (map[string]interface{}, error) {
	var updateTagMap map[string]interface{}
	err := mapstructure.Decode(tag, &updateTagMap)
	if err != nil {
		return updateTagMap, err
	}

	return updateTagMap, nil
}

func tagModelsToDomain(models []tagModel) []domain.Tag {
	tags := make([]domain.Tag, 0, len(models))
	for _, model := range models {
		tags = append(tags, tagModelToDomain(model))
	}
	return tags
}

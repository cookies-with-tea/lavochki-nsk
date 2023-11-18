package tags

import (
	"benches/internal/domain"

	"github.com/mitchellh/mapstructure"
)

type tagModel struct {
	ID    string `mapstructure:"id,omitempty"`
	Title string `mapstructure:"title,omitempty"`
}

type tagBenchModel struct {
	BenchID string `mapstructure:"bench_id"`
	TagID   string `mapstructure:"tag_id"`
}

func (tag *tagModel) FromDomain(tagDomain domain.Tag) {
	tag.ID = tagDomain.ID
	tag.Title = tagDomain.Title
}

func (tagBench *tagBenchModel) FromDomain(tagBenchDomain domain.TagBench) {
	tagBench.TagID = tagBenchDomain.TagID
	tagBench.BenchID = tagBenchDomain.BenchID
}

func (tagBench *tagBenchModel) ToMap() (map[string]interface{}, error) {
	var tagBenchMap map[string]interface{}
	err := mapstructure.Decode(tagBench, &tagBenchMap)
	if err != nil {
		return tagBenchMap, err
	}

	return tagBenchMap, nil
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

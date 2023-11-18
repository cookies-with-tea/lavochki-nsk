package tags

import (
	"benches/internal/domain"
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

func (tagBench *tagBenchModel) ToMap() map[string]interface{} {
	tagBenchMap := make(map[string]interface{})

	tagBenchMap["bench_id"] = tagBench.BenchID
	tagBenchMap["tag_id"] = tagBench.TagID

	return tagBenchMap
}

func tagModelToDomain(model tagModel) domain.Tag {
	return domain.Tag{
		ID:    model.ID,
		Title: model.Title,
	}
}

func (tag *tagModel) ToMap() map[string]interface{} {
	tagMap := make(map[string]interface{})

	tagMap["id"] = tag.ID
	tagMap["title"] = tag.Title

	return tagMap
}

func tagModelsToDomain(models []tagModel) []domain.Tag {
	tags := make([]domain.Tag, 0, len(models))
	for _, model := range models {
		tags = append(tags, tagModelToDomain(model))
	}
	return tags
}

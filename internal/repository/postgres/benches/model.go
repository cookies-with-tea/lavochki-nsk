package benches

import (
	"benches/internal/domain"
	"github.com/mitchellh/mapstructure"
)

type benchModel struct {
	ID       string   `mapstructure:"id,omitempty"`
	Lat      float64  `mapstructure:"lat,omitempty"`
	Lng      float64  `mapstructure:"lng,omitempty"`
	Images   []string `mapstructure:"images,omitempty"`
	IsActive bool     `mapstructure:"is_active,omitempty"`
	OwnerID  string   `mapstructure:"owner_id,omitempty"`
}

func (b *benchModel) FromDomain(bench domain.Bench) {
	b.ID = bench.ID
	b.Lat = bench.Lat
	b.Lng = bench.Lng
	b.Images = bench.Images
	b.IsActive = bench.IsActive
	b.OwnerID = bench.Owner
}

func benchModelToDomain(model benchModel) domain.Bench {
	return domain.Bench{
		ID:       model.ID,
		Lat:      model.Lat,
		Lng:      model.Lng,
		Images:   model.Images,
		IsActive: model.IsActive,
		Owner:    model.OwnerID,
	}
}

func benchModelsToDomain(models []benchModel) []domain.Bench {
	benches := make([]domain.Bench, 0, len(models))
	for _, model := range models {
		benches = append(benches, benchModelToDomain(model))
	}
	return benches
}

func (b *benchModel) ToMap() (map[string]interface{}, error) {
	var updateBenchMap map[string]interface{}
	err := mapstructure.Decode(b, &updateBenchMap)
	if err != nil {
		return updateBenchMap, err
	}

	return updateBenchMap, nil
}

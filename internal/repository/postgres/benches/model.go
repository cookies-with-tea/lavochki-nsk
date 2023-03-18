package benches

import (
	"benches/internal/domain"
	"database/sql"
	"github.com/mitchellh/mapstructure"
)

type benchModel struct {
	ID       string         `mapstructure:"id,omitempty"`
	Lat      float64        `mapstructure:"lat,omitempty"`
	Lng      float64        `mapstructure:"lng,omitempty"`
	Street   sql.NullString `mapstructure:"street,omitempty,squash"`
	Images   []string       `mapstructure:"images,omitempty"`
	IsActive bool           `mapstructure:"is_active,omitempty"`
	OwnerID  string         `mapstructure:"owner_id,omitempty"`
}

func (b *benchModel) FromDomain(bench domain.Bench) {
	b.ID = bench.ID
	b.Lat = bench.Lat
	b.Lng = bench.Lng
	b.Images = bench.Images
	b.IsActive = bench.IsActive
	b.OwnerID = bench.Owner

	if bench.Street != "" {
		b.Street = sql.NullString{String: bench.Street, Valid: true}
	} else {
		b.Street = sql.NullString{String: "", Valid: false}
	}
}

func benchModelToDomain(model benchModel) domain.Bench {
	bench := domain.Bench{
		ID:       model.ID,
		Lat:      model.Lat,
		Lng:      model.Lng,
		Images:   model.Images,
		IsActive: model.IsActive,
		Owner:    model.OwnerID,
	}

	streetValue, err := model.Street.Value()
	if err != nil {
		return domain.Bench{}
	}

	if value, ok := streetValue.(string); ok {
		bench.Street = value
	}

	return bench
}

func benchModelsToDomain(models []benchModel) []*domain.Bench {
	benches := make([]*domain.Bench, 0, len(models))
	for _, model := range models {
		bench := benchModelToDomain(model)
		benches = append(benches, &bench)
	}
	return benches
}

func (b *benchModel) ToMap() (map[string]interface{}, error) {
	var updateBenchMap map[string]interface{}

	configMapstructure := &mapstructure.DecoderConfig{
		Result: &updateBenchMap,
	}

	decoder, errCreateDecoder := mapstructure.NewDecoder(configMapstructure)
	if errCreateDecoder != nil {
		return nil, errCreateDecoder
	}

	err := decoder.Decode(b)
	if err != nil {
		return updateBenchMap, err
	}

	// TODO: зарефакторить, чтобы Mapstructure сам преобразовывал sql.NullString к string или nil
	if updateBenchMap["Valid"] == true {
		updateBenchMap["street"] = updateBenchMap["String"]
	} else {
		updateBenchMap["street"] = nil
	}
	delete(updateBenchMap, "String")
	delete(updateBenchMap, "Valid")

	return updateBenchMap, nil
}

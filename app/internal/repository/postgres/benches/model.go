package benches

import (
	"database/sql"

	"benches/internal/domain"
)

type benchModel struct {
	ID       string
	Lat      float64
	Lng      float64
	Street   sql.NullString
	Images   []string
	IsActive bool
	OwnerID  string
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
	benchMap := make(map[string]interface{})

	benchMap["id"] = b.ID
	benchMap["lat"] = b.Lat
	benchMap["lng"] = b.Lng
	benchMap["images"] = b.Images
	benchMap["is_active"] = b.IsActive
	benchMap["owner_id"] = b.OwnerID

	if b.Street.Valid {
		benchMap["street"] = b.Street.String
	}

	return benchMap, nil
}

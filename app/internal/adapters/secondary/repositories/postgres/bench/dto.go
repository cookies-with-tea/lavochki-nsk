package bench

import (
	"benches/internal/domain"
	"database/sql"
)

type model struct {
	ID            string
	Lat           float64
	Lng           float64
	Street        sql.NullString
	Images        []string
	DistrictID    int
	DistrictTitle string
	IsActive      bool
	OwnerID       string
}

type district struct {
	ID    int
	Title string
}

func (model *model) ToMap() map[string]any {
	return map[string]any{
		"id":        model.ID,
		"lat":       model.Lat,
		"lng":       model.Lng,
		"street":    model.Street.String,
		"images":    model.Images,
		"is_active": model.IsActive,
		"owner_id":  model.OwnerID,
	}
}

func (model *model) FromDomain(bench *domain.Bench) {
	model.ID = bench.ID
	model.Lat = bench.Lat
	model.Lng = bench.Lng
	model.Images = bench.Images
	model.IsActive = bench.IsActive
	model.OwnerID = bench.OwnerID
	model.DistrictID = bench.District.ID
	model.DistrictTitle = bench.District.Title

	if bench.Street != nil {
		model.Street = sql.NullString{String: *bench.Street, Valid: true}
	} else {
		model.Street = sql.NullString{String: "", Valid: false}
	}
}

func modelToDomain(model *model) *domain.Bench {
	bench := &domain.Bench{
		ID:       model.ID,
		Lat:      model.Lat,
		Lng:      model.Lng,
		Images:   model.Images,
		IsActive: model.IsActive,
		OwnerID:  model.OwnerID,
		District: &domain.District{
			ID:    model.DistrictID,
			Title: model.DistrictTitle,
		},
	}

	streetValue, err := model.Street.Value()
	if err != nil {
		return nil
	}

	if value, ok := streetValue.(string); ok {
		bench.Street = &value
	}

	return bench
}

func modelsToDomain(models []*model) []*domain.Bench {
	list := make([]*domain.Bench, len(models))
	for _, model := range models {
		list = append(list, modelToDomain(model))
	}

	return list
}

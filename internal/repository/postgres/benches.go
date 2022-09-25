package postgres

import (
	"benches/internal/domain"
	"github.com/uptrace/bun"
)

type benchModel struct {
	bun.BaseModel `bun:"table:benches,alias:benches,select:benches"`

	ID    string  `bun:"id,pk"`
	Lat   float64 `bun:"lat"`
	Lng   float64 `bun:"lng"`
	Image string  `bun:"image"`
}

func (b *benchModel) FromDomain(bench domain.Bench) {
	b.ID = bench.ID
	b.Lat = bench.Lat
	b.Lng = bench.Lng
	b.Image = bench.Image
}

func benchModelToDomain(model benchModel) domain.Bench {
	return domain.Bench{
		ID:    model.ID,
		Lat:   model.Lat,
		Lng:   model.Lng,
		Image: model.Image,
	}
}

func benchModelsToDomain(models []benchModel) []domain.Bench {
	benches := make([]domain.Bench, 0, len(models))
	for _, model := range models {
		benches = append(benches, benchModelToDomain(model))
	}
	return benches
}

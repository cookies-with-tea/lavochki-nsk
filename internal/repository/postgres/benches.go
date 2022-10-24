package postgres

import (
	"benches/internal/domain"
	"github.com/uptrace/bun"
)

type benchModel struct {
	bun.BaseModel `bun:"table:benches,alias:benches,select:benches"`

	ID       string     `bun:"id,pk"`
	Lat      float64    `bun:"lat"`
	Lng      float64    `bun:"lng"`
	Images   []string   `bun:"images,array"`
	IsActive bool       `bun:"is_active"`
	OwnerID  string     `bun:"owner_id"`
	Owner    *userModel `bun:"rel:belongs-to,join:owner_id=id"`
}

func (b *benchModel) FromDomain(bench domain.Bench) {
	b.ID = bench.ID
	b.Lat = bench.Lat
	b.Lng = bench.Lng
	b.Images = bench.Images
	b.IsActive = bench.IsActive
	b.OwnerID = bench.Owner.ID
}

func benchModelToDomain(model benchModel) domain.Bench {
	owner := userModelToDomain(*model.Owner)
	return domain.Bench{
		ID:       model.ID,
		Lat:      model.Lat,
		Lng:      model.Lng,
		Images:   model.Images,
		IsActive: model.IsActive,
		Owner:    &owner,
	}
}

func benchModelsToDomain(models []benchModel) []domain.Bench {
	benches := make([]domain.Bench, 0, len(models))
	for _, model := range models {
		benches = append(benches, benchModelToDomain(model))
	}
	return benches
}

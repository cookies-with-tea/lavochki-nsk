package postgres

import (
	"benches/internal/domain"
	"github.com/uptrace/bun"
)

type benchModel struct {
	bun.Model `bun:"table:benches,alias:benches,select:benches"`

	ID        string `bun:"id,pk"`
	PositionX int    `bun:"position_x"`
	PositionY int    `bun:"position_y"`
}

func (b *benchModel) FromDomain(bench domain.Bench) {
	b.ID = bench.ID
	b.PositionY = bench.PositionY
	b.PositionX = bench.PositionX
}

func benchModelToDomain(model benchModel) domain.Bench {
	return domain.Bench{
		ID:        model.ID,
		PositionX: model.PositionX,
		PositionY: model.PositionY,
	}
}

func benchModelsToDomain(models []benchModel) []domain.Bench {
	benches := make([]domain.Bench, 0, len(models))
	for _, model := range models {
		benches = append(benches, benchModelToDomain(model))
	}
	return benches
}

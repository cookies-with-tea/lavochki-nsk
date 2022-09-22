package postgres

import (
	"benches/internal/domain"
	"context"
	"github.com/uptrace/bun"
)

type BenchesRepository struct {
	db *bun.DB
}

func NewBenchesRepository(db *bun.DB) *BenchesRepository {
	return &BenchesRepository{
		db: db,
	}
}

func (b *BenchesRepository) GetBenches(ctx context.Context) ([]domain.Bench, error) {
	benchesModel := make([]benchModel, 0)
	err := b.db.NewSelect().Model(&benchesModel).Scan(ctx)
	if err != nil {
		return nil, err
	}
	users := benchModelsToDomain(benchesModel)
	return users, nil
}

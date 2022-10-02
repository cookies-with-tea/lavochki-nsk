package postgres

import (
	"benches/internal/domain"
	"context"
	"github.com/oklog/ulid/v2"
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
	err := b.db.NewSelect().Model(&benchesModel).Relation("Owner").Scan(ctx)
	if err != nil {
		return nil, err
	}
	users := benchModelsToDomain(benchesModel)
	return users, nil
}

func (b *BenchesRepository) CreateBench(ctx context.Context, bench domain.Bench) error {
	model := benchModel{}
	model.FromDomain(bench)
	model.ID = ulid.Make().String()
	_, err := b.db.NewInsert().Model(&model).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

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

func (b *BenchesRepository) GetBenches(ctx context.Context, isActive bool) ([]domain.Bench, error) {
	benchesModel := make([]benchModel, 0)
	err := b.db.NewSelect().Model(&benchesModel).Where("is_active = ?", isActive).Relation("Owner").Scan(ctx)
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

func (b *BenchesRepository) UpdateActiveBench(ctx context.Context, id string, active bool) error {
	model := &benchModel{}
	_, err := b.db.NewUpdate().Model(model).Set("is_active = ?", active).Where("id = ?", id).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (b *BenchesRepository) DeleteBench(ctx context.Context, id string) error {
	model := &benchModel{}
	_, err := b.db.NewDelete().Model(model).Where("id = ?", id).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

package postgres

import (
	"benches/internal/domain"
	"benches/internal/repository/model"
	"context"
	"github.com/oklog/ulid/v2"
	"github.com/uptrace/bun"
)

type BenchesRepository interface {
	All(ctx context.Context, isActive bool, sortOptions model.SortOptions) ([]domain.Bench, error)
	Create(ctx context.Context, bench domain.Bench) error
	Update(ctx context.Context, id string, decision bool) error
	Delete(ctx context.Context, id string) error
	ByID(ctx context.Context, id string) (domain.Bench, error)
}

type benchesRepository struct {
	db *bun.DB
}

func NewBenchesRepository(db *bun.DB) BenchesRepository {
	return &benchesRepository{
		db: db,
	}
}

func (b *benchesRepository) All(ctx context.Context, isActive bool, sortOptions model.SortOptions) ([]domain.Bench, error) {
	benchesModel := make([]benchModel, 0)
	err := b.db.NewSelect().Model(&benchesModel).Where("is_active = ?", isActive).
		Order(sortOptions.GetOrderBy()).
		Relation("Owner").
		Relation("Tags").
		Scan(ctx)
	if err != nil {
		return nil, err
	}
	benches := benchModelsToDomain(benchesModel)
	return benches, nil
}

func (b *benchesRepository) Create(ctx context.Context, bench domain.Bench) error {
	mBench := benchModel{}
	mBench.FromDomain(bench)
	mBench.ID = ulid.Make().String()
	_, err := b.db.NewInsert().Model(&mBench).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (b *benchesRepository) Update(ctx context.Context, id string, active bool) error {
	mBench := &benchModel{}
	_, err := b.db.NewUpdate().Model(mBench).Set("is_active = ?", active).Where("id = ?", id).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (b *benchesRepository) Delete(ctx context.Context, id string) error {
	mBench := &benchModel{}
	_, err := b.db.NewDelete().Model(mBench).Where("id = ?", id).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (b *benchesRepository) ByID(ctx context.Context, id string) (domain.Bench, error) {
	mBench := benchModel{}
	err := b.db.NewSelect().Model(&mBench).Where("benches.id = ?", id).
		Relation("Owner").
		Relation("Tags").
		Scan(ctx)
	if err != nil {
		return domain.Bench{}, err
	}
	return benchModelToDomain(mBench), nil
}

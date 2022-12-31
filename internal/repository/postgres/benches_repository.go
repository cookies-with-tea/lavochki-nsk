package postgres

import (
	"benches/internal/domain"
	"benches/internal/repository/model"
	"context"
	"github.com/oklog/ulid/v2"
	"github.com/uptrace/bun"
)

type BenchesRepository interface {
	GetBenches(ctx context.Context, isActive bool, sortOptions model.SortOptions) ([]domain.Bench, error)
	CreateBench(ctx context.Context, bench domain.Bench) error
	UpdateActiveBench(ctx context.Context, id string, decision bool) error
	DeleteBench(ctx context.Context, id string) error
	GetBenchByID(ctx context.Context, id string) (domain.Bench, error)
}

type benchesRepository struct {
	db *bun.DB
}

func NewBenchesRepository(db *bun.DB) BenchesRepository {
	return &benchesRepository{
		db: db,
	}
}

func (b *benchesRepository) GetBenches(ctx context.Context, isActive bool, sortOptions model.SortOptions) ([]domain.Bench, error) {
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

func (b *benchesRepository) CreateBench(ctx context.Context, bench domain.Bench) error {
	model := benchModel{}
	model.FromDomain(bench)
	model.ID = ulid.Make().String()
	_, err := b.db.NewInsert().Model(&model).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (b *benchesRepository) UpdateActiveBench(ctx context.Context, id string, active bool) error {
	model := &benchModel{}
	_, err := b.db.NewUpdate().Model(model).Set("is_active = ?", active).Where("id = ?", id).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (b *benchesRepository) DeleteBench(ctx context.Context, id string) error {
	model := &benchModel{}
	_, err := b.db.NewDelete().Model(model).Where("id = ?", id).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (b *benchesRepository) GetBenchByID(ctx context.Context, id string) (domain.Bench, error) {
	model := benchModel{}
	err := b.db.NewSelect().Model(&model).Where("benches.id = ?", id).Relation("Owner").Scan(ctx)
	if err != nil {
		return domain.Bench{}, err
	}
	return benchModelToDomain(model), nil
}

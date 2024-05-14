package bench

import (
	"benches/internal/domain"
	"context"
	"fmt"

	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

const (
	scheme      = "public"
	table       = "benches"
	tableScheme = scheme + "." + table
)

type Repository struct {
	client       *pgxpool.Pool
	queryBuilder squirrel.StatementBuilderType
}

func NewRepository(pool *pgxpool.Pool) *Repository {
	return &Repository{
		client:       pool,
		queryBuilder: squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

func (repository *Repository) Create(ctx context.Context, bench *domain.Bench) (*domain.Bench, error) {
	dto := model{}
	dto.FromDomain(bench)
	dto.ID = uuid.New().String()

	sql, args, err := repository.queryBuilder.
		Insert(tableScheme).
		SetMap(dto.ToMap()).
		PlaceholderFormat(squirrel.Dollar).
		ToSql()
	if err != nil {
		return nil, err
	}

	_, err = repository.client.Exec(ctx, sql, args...)
	if err != nil {
		return nil, err
	}

	bench.ID = dto.ID

	return bench, nil
}

func (repository *Repository) All(ctx context.Context) ([]*domain.Bench, error) {
	sql, args, err := repository.queryBuilder.
		Select("benches.id").
		Columns("benches.lat", "benches.lng", "benches.street", "benches.is_active", "benches.images", "benches.owner_id", "districts.id", "distircts.title").
		From(tableScheme).
		Join("districts d ON d.id = district_id").
		ToSql()
	if err != nil {
		return nil, err
	}

	fmt.Println("QUERY: ", sql)

	rows, err := repository.client.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := make([]*model, 0)
	for rows.Next() {
		bench := model{}
		if err = rows.Scan(
			&bench.ID,
			&bench.Lat,
			&bench.Lng,
			&bench.Street,
			&bench.IsActive,
			&bench.Images,
			&bench.OwnerID,
			&bench.DistrictID,
			&bench.DistrictTitle,
		); err != nil {
			return nil, err
		}

		list = append(list, &bench)
	}

	return modelsToDomain(list), nil
}

func (repository *Repository) ByID(ctx context.Context, id string) (*domain.Bench, error) {
	sql, args, err := repository.queryBuilder.Select("id").
		Columns("lat", "lng", "street", "is_active", "images", "owner_id").
		From(tableScheme).
		Where(squirrel.Eq{"id": id}).
		ToSql()
	if err != nil {
		return nil, err
	}

	var bench model
	err = repository.client.QueryRow(ctx, sql, args...).Scan(
		&bench.ID,
		&bench.Lat,
		&bench.Lng,
		&bench.Street,
		&bench.IsActive,
		&bench.Images,
		&bench.OwnerID,
	)
	if err != nil {
		// TODO: Добавить custom ошибку для NotFound.
		return nil, err
	}

	return modelToDomain(&bench), nil
}

func (repository *Repository) Update(ctx context.Context, id string, bench *domain.Bench) {}
func (repository *Repository) Delete(ctx context.Context, id string)                      {}

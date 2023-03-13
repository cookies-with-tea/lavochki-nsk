package benches

import (
	"benches/internal/domain"
	"benches/internal/repository/model"
	"benches/internal/repository/postgres"
	"context"
	"github.com/Masterminds/squirrel"
	"github.com/oklog/ulid/v2"
)

const (
	scheme      = "public"
	table       = "benches"
	tableScheme = scheme + "." + table
)

type Repository interface {
	All(ctx context.Context, isActive bool, sortOptions model.SortOptions, paginateOptions model.PaginateOptions) ([]*domain.Bench, error)
	Count(ctx context.Context, isActive bool) (int, error)
	ByID(ctx context.Context, id string) (*domain.Bench, error)
	Create(ctx context.Context, bench domain.Bench) error
	Update(ctx context.Context, id string, bench domain.Bench) error
	Delete(ctx context.Context, id string) error
}

type repository struct {
	client       postgres.Client
	queryBuilder squirrel.StatementBuilderType
}

func NewBenchesRepository(client postgres.Client) Repository {
	return &repository{
		client:       client,
		queryBuilder: squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

func (repository *repository) All(ctx context.Context, isActive bool, sortOptions model.SortOptions,
	paginateOptions model.PaginateOptions) ([]*domain.Bench, error) {
	query := repository.queryBuilder.
		Select("id").
		Columns("lat", "lng", "street", "is_active", "images", "owner_id").
		From(tableScheme).Where(squirrel.Eq{"is_active": isActive})

	if sortOptions != nil {
		query = query.OrderBy(sortOptions.GetOrderBy())
	}

	if paginateOptions != nil {
		page := paginateOptions.GetPage()
		perPage := paginateOptions.GetPerPage()

		query = query.Limit(perPage).Offset(uint64((page - 1) * perPage))
	}

	sql, args, err := query.ToSql()
	if err != nil {
		return nil, err
	}

	rows, err := repository.client.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := make([]benchModel, 0)

	for rows.Next() {
		bench := benchModel{}
		if err = rows.Scan(
			&bench.ID,
			&bench.Lat,
			&bench.Lng,
			&bench.Street,
			&bench.IsActive,
			&bench.Images,
			&bench.OwnerID,
		); err != nil {
			return nil, err
		}

		list = append(list, bench)
	}

	return benchModelsToDomain(list), nil
}

func (repository *repository) Count(ctx context.Context, isActive bool) (int, error) {
	query := repository.queryBuilder.Select("COUNT(*)").From(tableScheme).Where(squirrel.Eq{"is_active": isActive})

	sql, args, errToSql := query.ToSql()
	if errToSql != nil {
		return 0, errToSql
	}

	var count int
	err := repository.client.QueryRow(ctx, sql, args...).Scan(&count)
	if err != nil {
		return 0, err
	}

	return count, nil
}

func (repository *repository) ByID(ctx context.Context, id string) (*domain.Bench, error) {
	sql, args, errBuild := repository.queryBuilder.
		Select("id").
		Columns("lat", "lng", "street", "is_active", "images", "owner_id").
		From(tableScheme).Where(squirrel.Eq{"id": id}).ToSql()

	if errBuild != nil {
		return nil, errBuild
	}

	var bench benchModel

	err := repository.client.QueryRow(ctx, sql, args...).Scan(
		&bench.ID,
		&bench.Lat,
		&bench.Lng,
		&bench.Street,
		&bench.IsActive,
		&bench.Images,
		&bench.OwnerID,
	)

	if err != nil {
		return nil, err
	}

	benchDomain := benchModelToDomain(bench)
	return &benchDomain, nil
}

func (repository *repository) Create(ctx context.Context, bench domain.Bench) error {
	createBenchModel := benchModel{}
	createBenchModel.FromDomain(bench)
	createBenchModel.ID = ulid.Make().String()

	modelMap, errToMap := createBenchModel.ToMap()
	if errToMap != nil {
		return errToMap
	}

	sql, args, errBuild := repository.queryBuilder.Insert(tableScheme).SetMap(modelMap).
		PlaceholderFormat(squirrel.Dollar).ToSql()

	if errBuild != nil {
		return errBuild
	}

	if exec, execErr := repository.client.Exec(ctx, sql, args...); execErr != nil {
		return execErr
	} else if exec.RowsAffected() == 0 || !exec.Insert() {
		return execErr
	}
	return nil
}

func (repository *repository) Update(ctx context.Context, id string, bench domain.Bench) error {
	updateBenchModel := benchModel{}
	updateBenchModel.FromDomain(bench)

	modelMap, errToMap := updateBenchModel.ToMap()
	if errToMap != nil {
		return errToMap
	}

	sql, args, errBuild := repository.queryBuilder.Update(tableScheme).SetMap(modelMap).
		Where(squirrel.Eq{"id": id}).
		PlaceholderFormat(squirrel.Dollar).
		ToSql()

	if errBuild != nil {
		return errBuild
	}

	if exec, errExec := repository.client.Exec(ctx, sql, args...); errExec != nil {
		return errExec
	} else if exec.RowsAffected() == 0 || !exec.Update() {
		return errExec
	}

	return nil
}

func (repository *repository) Delete(ctx context.Context, id string) error {
	sql, args, errBuild := repository.queryBuilder.
		Delete(tableScheme).
		Where(squirrel.Eq{"id": id}).
		ToSql()

	if errBuild != nil {
		return errBuild
	}

	if exec, errExec := repository.client.Exec(ctx, sql, args...); errExec != nil {
		return errExec
	} else if exec.RowsAffected() == 0 || !exec.Delete() {
		return errExec
	}

	return nil
}

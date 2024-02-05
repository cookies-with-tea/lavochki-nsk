package benches

import (
	"context"
	"errors"

	"benches/internal/apperror"
	"benches/internal/domain"
	"benches/internal/repository/model"
	"benches/internal/repository/postgres"

	"github.com/jackc/pgx/v5"

	"github.com/Masterminds/squirrel"
	"github.com/oklog/ulid/v2"
)

const (
	scheme      = "public"
	table       = "benches"
	tableScheme = scheme + "." + table
)

type Repository interface {
	All(
		ctx context.Context,
		isActive bool,
		sortOptions model.SortOptions,
		paginateOptions model.PaginateOptions,
		filtersOptions model.FilterOptions,
	) ([]*domain.Bench, error)
	Count(ctx context.Context, isActive bool) (int, error)
	ByID(ctx context.Context, id string) (*domain.Bench, error)
	Create(ctx context.Context, bench domain.Bench) (*domain.Bench, error)
	Update(ctx context.Context, id string, bench domain.Bench) error
	Delete(ctx context.Context, id string) error
	ByRange(ctx context.Context, latStart, latEnd, lngStart, lngEnd float64, extends []string) ([]*domain.Bench, error)
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
	paginateOptions model.PaginateOptions, filtersOptions model.FilterOptions) ([]*domain.Bench, error) {
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

		query = query.Limit(perPage).Offset((page - 1) * perPage)
	}

	if filtersOptions != nil {
		for _, filter := range filtersOptions.GetFilters() {
			query = query.Where(filter)
		}
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
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, apperror.ErrNotFound
		}
		return nil, err
	}

	benchDomain := benchModelToDomain(bench)
	return &benchDomain, nil
}

func (repository *repository) Create(ctx context.Context, bench domain.Bench) (*domain.Bench, error) {
	createBenchModel := benchModel{}
	createBenchModel.FromDomain(bench)
	createBenchModel.ID = ulid.Make().String()

	modelMap, errToMap := createBenchModel.ToMap()
	if errToMap != nil {
		return nil, errToMap
	}

	sql, args, errBuild := repository.queryBuilder.Insert(tableScheme).SetMap(modelMap).
		Suffix("RETURNING \"id\", \"lat\", \"lng\", \"street\", \"images\", \"is_active\", \"owner_id\"").
		PlaceholderFormat(squirrel.Dollar).ToSql()

	if errBuild != nil {
		return nil, errBuild
	}

	resultBench := benchModel{}
	errQueryRow := repository.client.QueryRow(ctx, sql, args...).Scan(
		&resultBench.ID,
		&resultBench.Lat,
		&resultBench.Lng,
		&resultBench.Street,
		&resultBench.Images,
		&resultBench.IsActive,
		&resultBench.OwnerID,
	)

	if errQueryRow != nil {
		return nil, errQueryRow
	}

	benchModel := benchModelToDomain(resultBench)
	return &benchModel, nil
}

func (repository *repository) Update(ctx context.Context, id string, bench domain.Bench) error {
	updateBenchModel := benchModel{}
	updateBenchModel.FromDomain(bench)

	modelMap, errToMap := updateBenchModel.ToMapUpdate()
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

func (repository *repository) ByRange(ctx context.Context, latStart, latEnd,
	lngStart, lngEnd float64, extends []string) ([]*domain.Bench, error) {
	sql, args, errBuild := repository.queryBuilder.
		Select("id").
		Columns("lat", "lng", "street", "is_active", "images", "owner_id").
		From(tableScheme).
		Where("lat BETWEEN ? AND ? AND lng BETWEEN ? AND ?",
			latStart, latEnd, lngStart, lngEnd).
		Where(squirrel.NotEq{"id": extends}).
		ToSql()
	if errBuild != nil {
		return nil, errBuild
	}

	rows, errQuery := repository.client.Query(ctx, sql, args...)
	if errQuery != nil {
		if errors.Is(errQuery, pgx.ErrNoRows) {
			return nil, apperror.ErrNotFound
		}
		return nil, errQuery
	}
	defer rows.Close()

	list := make([]benchModel, 0)

	var err error
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

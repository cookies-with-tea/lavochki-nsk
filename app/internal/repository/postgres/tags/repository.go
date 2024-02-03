package tags

import (
	"context"

	"benches/internal/domain"
	"benches/internal/repository/postgres"

	"github.com/Masterminds/squirrel"
	"github.com/oklog/ulid/v2"
)

const (
	scheme       = "public"
	table        = "tags"
	tableScheme  = scheme + "." + table
	tableToBench = scheme + "." + "tags_benches"
)

type Repository interface {
	All(ctx context.Context) ([]*domain.Tag, error)
	Create(ctx context.Context, tag domain.Tag) error
	CreateTagToBench(ctx context.Context, tagBench domain.TagBench) error
	ByBenches(ctx context.Context, benchesIDs []string) (map[string][]*domain.Tag, error)
	Delete(ctx context.Context, ids []string) error
	DeleteByBench(ctx context.Context, benchID string) error
}

type repository struct {
	client       postgres.Client
	queryBuilder squirrel.StatementBuilderType
}

func NewTagsRepository(client postgres.Client) Repository {
	return &repository{
		client:       client,
		queryBuilder: squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

// All Получить все теги.
func (repository *repository) All(ctx context.Context) ([]*domain.Tag, error) {
	query := repository.queryBuilder.
		Select("id").
		Columns("title").
		From(tableScheme)

	sql, args, err := query.ToSql()
	if err != nil {
		return nil, err
	}

	rows, err := repository.client.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	list := make([]*domain.Tag, 0)

	for rows.Next() {
		tag := domain.Tag{}
		if err = rows.Scan(
			&tag.ID,
			&tag.Title,
		); err != nil {
			return nil, err
		}

		list = append(list, &tag)
	}

	return list, nil
}

// Create Создать тег.
func (repository *repository) Create(ctx context.Context, tag domain.Tag) error {
	createTagModel := tagModel{}
	createTagModel.FromDomain(tag)
	createTagModel.ID = ulid.Make().String()

	modelMap := createTagModel.ToMap()

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

// CreateTagToBench Создать связь между лавочкой и тегом.
func (repository *repository) CreateTagToBench(ctx context.Context, tagBench domain.TagBench) error {
	createTagBenchModel := tagBenchModel{}
	createTagBenchModel.FromDomain(tagBench)

	modelMap := createTagBenchModel.ToMap()

	sql, args, errBuild := repository.queryBuilder.Insert(tableToBench).SetMap(modelMap).
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

// ByBenches Получить теги связанные с определёнными лавочками.
func (repository *repository) ByBenches(ctx context.Context, benchesIDs []string) (map[string][]*domain.Tag, error) {
	query := repository.queryBuilder.Select("bt.bench_id", "t.id", "t.title").
		From("tags t").
		Join("tags_benches bt ON t.id = bt.tag_id").
		Where(squirrel.Eq{"bt.bench_id": benchesIDs})

	sql, args, err := query.ToSql()
	if err != nil {
		return nil, err
	}

	rows, err := repository.client.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	tags := make(map[string][]*domain.Tag)
	for rows.Next() {
		var benchID string
		var tag domain.Tag
		errScan := rows.Scan(&benchID, &tag.ID, &tag.Title)

		if errScan != nil {
			return nil, errScan
		}
		tags[benchID] = append(tags[benchID], &tag)
	}

	return tags, nil
}

func (repository *repository) Delete(ctx context.Context, ids []string) error {
	sql, args, errBuild := repository.queryBuilder.
		Delete(tableScheme).
		Where(squirrel.Eq{"id": ids}).
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

func (repository *repository) DeleteByBench(ctx context.Context, benchID string) error {
	sql, args, errBuild := repository.queryBuilder.
		Delete(tableToBench).
		Where(squirrel.Eq{"bench_id": benchID}).
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

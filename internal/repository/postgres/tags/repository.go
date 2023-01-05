package tags

import (
	"benches/internal/domain"
	"benches/internal/repository/postgres"
	"context"
	"github.com/Masterminds/squirrel"
	"github.com/oklog/ulid/v2"
)

const (
	scheme      = "public"
	table       = "tags"
	tableScheme = scheme + "." + table
)

type Repository interface {
	All(ctx context.Context) ([]*domain.Tag, error)
	Create(ctx context.Context, tag domain.Tag) error
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

// All Получить все теги
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

// Create Создать тег
func (repository *repository) Create(ctx context.Context, tag domain.Tag) error {
	createTagModel := tagModel{}
	createTagModel.FromDomain(tag)
	createTagModel.ID = ulid.Make().String()

	modelMap, errToMap := createTagModel.ToMap()
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

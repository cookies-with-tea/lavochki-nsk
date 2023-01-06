package comments

import (
	"benches/internal/domain"
	"benches/internal/repository/postgres"
	"context"
	"github.com/Masterminds/squirrel"
	"github.com/oklog/ulid/v2"
)

const (
	scheme      = "public"
	table       = "comments"
	tableScheme = scheme + "." + table
)

type Repository interface {
	ByBenchID(ctx context.Context, id string) ([]*domain.Comment, error)
	ByParentID(ctx context.Context, id string) ([]*domain.Comment, error)
	ByID(ctx context.Context, id string) (*domain.Comment, error)
	Create(ctx context.Context, comment domain.Comment) error
	Update(ctx context.Context, id string, comment domain.Comment) error
}

type repository struct {
	client       postgres.Client
	queryBuilder squirrel.StatementBuilderType
}

func NewCommentsRepository(client postgres.Client) Repository {
	return &repository{
		client:       client,
		queryBuilder: squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

// ByBenchID Получение всех комментариев первого уровня по ID лавочки
func (repository *repository) ByBenchID(ctx context.Context, id string) ([]*domain.Comment, error) {
	query := repository.queryBuilder.Select("id").
		Columns("bench_id", "parent_id", "author_id", "content").
		From(tableScheme).Where(squirrel.Eq{"bench_id": id, "parent_id": nil})

	sql, args, errToSql := query.ToSql()
	if errToSql != nil {
		return nil, errToSql
	}

	rows, err := repository.client.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	list := make([]*domain.Comment, 0)
	for rows.Next() {
		comment := domain.Comment{}
		if err = rows.Scan(
			&comment.ID,
			&comment.BenchID,
			&comment.ParentID,
			&comment.AuthorID,
			&comment.Content,
		); err != nil {
			return nil, err
		}

		list = append(list, &comment)
	}

	return list, nil
}

// ByParentID Получение всех комментариев по ID родители
func (repository *repository) ByParentID(ctx context.Context, id string) ([]*domain.Comment, error) {
	query := repository.queryBuilder.Select("id").
		Columns("bench_id", "parent_id", "author_id", "content").
		From(tableScheme).
		Where(squirrel.Eq{"parent_id": id})

	sql, args, errToSql := query.ToSql()
	if errToSql != nil {
		return nil, errToSql
	}

	rows, err := repository.client.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	list := make([]*domain.Comment, 0)
	for rows.Next() {
		comment := domain.Comment{}
		if err = rows.Scan(
			&comment.ID,
			&comment.BenchID,
			&comment.ParentID,
			&comment.AuthorID,
			&comment.Content,
		); err != nil {
			return nil, err
		}

		list = append(list, &comment)
	}

	return list, nil
}

// ByID Получение комментария по ID
func (repository *repository) ByID(ctx context.Context, id string) (*domain.Comment, error) {
	sql, args, errToSql := repository.queryBuilder.Select("id").
		Columns("bench_id", "parent_id", "author_id", "content").
		From(tableScheme).
		Where(squirrel.Eq{"id": id}).ToSql()

	if errToSql != nil {
		return nil, errToSql
	}

	var comment domain.Comment

	err := repository.client.QueryRow(ctx, sql, args...).Scan(
		&comment.ID,
		&comment.BenchID,
		&comment.ParentID,
		&comment.AuthorID,
		&comment.Content,
	)

	if err != nil {
		return nil, err
	}

	return &comment, nil
}

// Create Создание комментария
func (repository *repository) Create(ctx context.Context, comment domain.Comment) error {
	createCommentModel := commentModel{}
	createCommentModel.FromDomain(comment)
	createCommentModel.ID = ulid.Make().String()

	modelMap, errToMap := createCommentModel.ToMap()
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

// Update Обновление комментария
func (repository *repository) Update(ctx context.Context, id string, comment domain.Comment) error {
	updateCommentModel := commentModel{}
	updateCommentModel.FromDomain(comment)

	modelMap, errToMap := updateCommentModel.ToMap()
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

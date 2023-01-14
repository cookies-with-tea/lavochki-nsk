package users

import (
	"benches/internal/domain"
	"benches/internal/repository/postgres"
	"context"
	"github.com/Masterminds/squirrel"
	"github.com/oklog/ulid/v2"
)

const (
	scheme      = "public"
	table       = "users"
	tableScheme = scheme + "." + table
)

type Repository interface {
	ByTelegramID(ctx context.Context, telegramID int) (*domain.User, error)
	ByID(ctx context.Context, id string) (*domain.User, error)
	Create(ctx context.Context, user domain.User) error
	All(ctx context.Context) ([]*domain.User, error)
}

type repository struct {
	client       postgres.Client
	queryBuilder squirrel.StatementBuilderType
}

func NewUsersRepository(client postgres.Client) Repository {
	return &repository{
		client:       client,
		queryBuilder: squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

func (repository *repository) ByTelegramID(ctx context.Context, telegramID int) (*domain.User, error) {
	sql, args, errToSql := repository.queryBuilder.Select("id").
		Columns("username", "telegram_id", "role").
		From(tableScheme).
		Where(squirrel.Eq{"telegram_id": telegramID}).ToSql()

	if errToSql != nil {
		return nil, errToSql
	}

	var user domain.User

	err := repository.client.QueryRow(ctx, sql, args...).Scan(
		&user.ID,
		&user.Username,
		&user.TelegramID,
		&user.Role,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (repository *repository) ByID(ctx context.Context, id string) (*domain.User, error) {
	sql, args, errToSql := repository.queryBuilder.Select("id").
		Columns("username", "telegram_id", "role").
		From(tableScheme).
		Where(squirrel.Eq{"id": id}).ToSql()

	if errToSql != nil {
		return nil, errToSql
	}

	var user domain.User

	err := repository.client.QueryRow(ctx, sql, args...).Scan(
		&user.ID,
		&user.Username,
		&user.TelegramID,
		&user.Role,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (repository *repository) Create(ctx context.Context, user domain.User) error {
	createUserModel := userModel{}
	createUserModel.FromDomain(user)
	createUserModel.ID = ulid.Make().String()

	modelMap, errToMap := createUserModel.ToMap()
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

func (repository *repository) All(ctx context.Context) ([]*domain.User, error) {
	query := repository.queryBuilder.Select("id").
		Columns("username", "telegram_id", "role").
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

	list := make([]*domain.User, 0)

	for rows.Next() {
		user := domain.User{}
		if err = rows.Scan(
			&user.ID,
			&user.Username,
			&user.TelegramID,
			&user.Role,
		); err != nil {
			return nil, err
		}

		list = append(list, &user)
	}

	return list, nil
}

package user

import (
	"benches/internal/application/apperror"
	"benches/internal/domain"
	"context"
	"errors"

	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"
	"github.com/jackc/pgx"
	"github.com/jackc/pgx/v5/pgxpool"
)

const (
	scheme      = "public"
	table       = "users"
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

func (repository *Repository) Create(ctx context.Context, user *domain.User) (*domain.User, error) {
	dto := model{}
	dto.FromDomain(*user)
	dto.ID = uuid.New().String()

	modelMap := dto.ToMap()

	sql, args, errBuild := repository.queryBuilder.Insert(tableScheme).SetMap(modelMap).
		PlaceholderFormat(squirrel.Dollar).
		ToSql()
	if errBuild != nil {
		return nil, errBuild
	}

	_, err := repository.client.Exec(ctx, sql, args...)
	if err != nil {
		return nil, err
	}

	user.ID = dto.ID

	return user, nil
}

func (repository *Repository) ByTelegramID(ctx context.Context, telegramID int) (*domain.User, error) {
	query, args, errToSql := repository.queryBuilder.Select("id").
		Columns("username", "telegram_id", "role").
		From(tableScheme).
		Where(squirrel.Eq{"telegram_id": telegramID}).ToSql()
	if errToSql != nil {
		return nil, errToSql
	}

	var user domain.User
	err := repository.client.QueryRow(ctx, query, args...).Scan(
		&user.ID,
		&user.Username,
		&user.TelegramID,
		&user.Role,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, apperror.ErrNotFound
		}

		return nil, err
	}

	return &user, nil
}

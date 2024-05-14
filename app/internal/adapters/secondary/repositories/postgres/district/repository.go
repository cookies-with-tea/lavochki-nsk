package district

import (
	"benches/internal/domain"
	"context"

	"github.com/Masterminds/squirrel"
	"github.com/jackc/pgx/v5/pgxpool"
)

const (
	scheme      = "public"
	table       = "districts"
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

func (repository *Repository) All(ctx context.Context) ([]*domain.District, error) {
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

	list := make([]*model, 0)

	for rows.Next() {
		dto := model{}
		if err = rows.Scan(
			&dto.ID,
			&dto.Title,
		); err != nil {
			return nil, err
		}

		list = append(list, &dto)
	}

	return toDomains(list), nil
}

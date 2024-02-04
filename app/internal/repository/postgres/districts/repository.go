package districts

import (
	"context"

	"benches/internal/domain"
	"benches/internal/repository/postgres"

	"github.com/Masterminds/squirrel"
)

const (
	scheme      = "public"
	table       = "districts"
	tableScheme = scheme + "." + table
)

type Repository struct {
	client       postgres.Client
	queryBuilder squirrel.StatementBuilderType
}

func NewDistrictsRepository(client postgres.Client) *Repository {
	return &Repository{
		client:       client,
		queryBuilder: squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

func (repository *Repository) All(ctx context.Context) ([]*domain.District, error) {
	query := repository.queryBuilder.Select("id").Columns("title").From(tableScheme)

	sql, args, err := query.ToSql()
	if err != nil {
		return nil, err
	}

	rows, err := repository.client.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := make([]distinctModel, 0)
	for rows.Next() {
		distinct := distinctModel{}
		if err = rows.Scan(
			&distinct.ID,
			&distinct.Title,
		); err != nil {
			return nil, err
		}

		list = append(list, distinct)
	}

	return distinctModelsToDomain(list), nil
}

package reports

import (
	"benches/internal/domain"
	"benches/internal/repository/postgres"
	"context"
	"github.com/Masterminds/squirrel"
	"github.com/oklog/ulid/v2"
)

const (
	scheme      = "public"
	table       = "comments_reports"
	tableScheme = scheme + "." + table
)

type Repository interface {
	All(ctx context.Context, isActive bool) ([]*domain.CommentReport, error)
	CreateReportComment(ctx context.Context, report domain.CommentReport) error
	IsExistsReportComment(ctx context.Context, reportID string, userID string) (bool, error)
}

type reportsRepository struct {
	client       postgres.Client
	queryBuilder squirrel.StatementBuilderType
}

func NewReportsRepository(client postgres.Client) Repository {
	return &reportsRepository{
		client:       client,
		queryBuilder: squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

// All Получение всех жалоб на комментарии
func (repository *reportsRepository) All(ctx context.Context, isActive bool) ([]*domain.CommentReport, error) {
	query := repository.queryBuilder.Select("id").
		Columns("cause", "comment_id", "user_id", "is_active").
		From(tableScheme).Where(squirrel.Eq{"is_active": isActive})

	sql, args, errToSql := query.ToSql()
	if errToSql != nil {
		return nil, errToSql
	}

	rows, err := repository.client.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	list := make([]*domain.CommentReport, 0)
	for rows.Next() {
		report := domain.CommentReport{}
		if err = rows.Scan(
			&report.ID,
			&report.Cause,
			&report.CommentID,
			&report.UserID,
			&report.IsActive,
		); err != nil {
			return nil, err
		}

		list = append(list, &report)
	}

	return list, nil
}

func (repository *reportsRepository) CreateReportComment(ctx context.Context, report domain.CommentReport) error {
	createReportCommentModel := reportCommentModel{}
	createReportCommentModel.FromDomain(report)
	createReportCommentModel.ID = ulid.Make().String()

	modelMap, errToMap := createReportCommentModel.ToMap()
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

func (repository *reportsRepository) IsExistsReportComment(ctx context.Context, reportID string, userID string) (bool, error) {
	sql, args, errToSQL := repository.queryBuilder.Select("id").
		Prefix("SELECT EXISTS (").
		Columns("cause", "comment_id", "user_id", "is_active").
		From(tableScheme).
		Where(squirrel.Eq{"report_id": reportID, "user_id": userID}).
		Suffix(")").ToSql()

	if errToSQL != nil {
		return false, errToSQL
	}

	var isExists bool

	err := repository.client.QueryRow(ctx, sql, args...).Scan(
		&isExists,
	)

	if err != nil {
		return false, err
	}

	return isExists, nil
}

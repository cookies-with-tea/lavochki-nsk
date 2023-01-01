package postgres

import (
	"benches/internal/domain"
	"context"
	"github.com/oklog/ulid/v2"
	"github.com/uptrace/bun"
)

type ReportsRepository interface {
	All(ctx context.Context, isActive bool) ([]domain.CommentReport, error)
	CreateReportComment(ctx context.Context, report domain.CommentReport) error
	IsExistsReportComment(ctx context.Context, reportID string, userID string) (bool, error)
}

type reportsRepository struct {
	db *bun.DB
}

func NewReportsRepository(db *bun.DB) ReportsRepository {
	return &reportsRepository{db: db}
}

// All Получение всех жалоб на комментарии
func (repository *reportsRepository) All(ctx context.Context, isActive bool) ([]domain.CommentReport, error) {
	reportsModel := make([]reportCommentModel, 0)
	err := repository.db.NewSelect().Model(&reportsModel).Where("is_active = ?", isActive).Scan(ctx)
	if err != nil {
		return nil, err
	}
	reports := reportsCommentModelsToDomain(reportsModel)
	return reports, nil
}

func (repository *reportsRepository) CreateReportComment(ctx context.Context, report domain.CommentReport) error {
	model := reportCommentModel{}
	model.FromDomain(report)
	model.ID = ulid.Make().String()
	_, err := repository.db.NewInsert().Model(&model).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

func (repository *reportsRepository) IsExistsReportComment(ctx context.Context, reportID string, userID string) (bool, error) {
	model := reportCommentModel{}
	exists, err := repository.db.NewSelect().Model(&model).
		Where("report_id = ? AND user_id = ?", reportID, userID).
		Exists(ctx)

	if err != nil {
		return exists, err
	}

	return exists, nil
}

package postgres

import (
	"benches/internal/domain"
	"github.com/uptrace/bun"
)

type reportCommentModel struct {
	bun.BaseModel `bun:"table:reports,alias:reports,select:reports"`

	ID        string `bun:"id,pk"`
	Cause     string `bun:"cause"`
	CommentID string `bun:"comment_id"`
	UserID    string `bun:"user_id"`
	IsActive  bool   `bun:"is_active"`
}

func (report *reportCommentModel) FromDomain(reportDomain domain.CommentReport) {
	report.ID = reportDomain.ID
	report.Cause = reportDomain.Cause
	report.CommentID = reportDomain.CommentID
	report.UserID = reportDomain.UserID
	report.IsActive = reportDomain.IsActive
}

func reportsCommentModelToDomain(model reportCommentModel) domain.CommentReport {
	return domain.CommentReport{
		ID:        model.ID,
		Cause:     model.Cause,
		CommentID: model.CommentID,
		UserID:    model.UserID,
		IsActive:  model.IsActive,
	}
}

func reportsCommentModelsToDomain(models []reportCommentModel) []domain.CommentReport {
	reports := make([]domain.CommentReport, 0, len(models))

	for _, model := range models {
		reports = append(reports, reportsCommentModelToDomain(model))
	}
	return reports
}

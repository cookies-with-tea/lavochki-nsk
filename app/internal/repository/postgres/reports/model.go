package reports

import (
	"benches/internal/domain"
)

type reportCommentModel struct {
	ID        string
	Cause     string
	CommentID string
	UserID    string
	IsActive  bool
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

func (report *reportCommentModel) ToMap() map[string]interface{} {
	reportCommentMap := make(map[string]interface{})

	reportCommentMap["id"] = report.ID
	reportCommentMap["cause"] = report.Cause
	reportCommentMap["comment_id"] = report.CommentID
	reportCommentMap["user_id"] = report.UserID
	reportCommentMap["is_active"] = report.IsActive

	return reportCommentMap
}

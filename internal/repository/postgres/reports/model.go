package reports

import (
	"benches/internal/domain"
	"github.com/mitchellh/mapstructure"
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

func (report *reportCommentModel) ToMap() (map[string]interface{}, error) {
	var updateReportCommentMap map[string]interface{}
	err := mapstructure.Decode(report, &updateReportCommentMap)
	if err != nil {
		return updateReportCommentMap, err
	}

	return updateReportCommentMap, nil
}

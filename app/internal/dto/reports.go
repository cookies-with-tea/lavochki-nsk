package dto

import (
	"benches/internal/domain"

	validation "github.com/go-ozzo/ozzo-validation"
)

type CreateReportComment struct {
	ID        string `json:"id"`
	Cause     string `json:"cause"`
	CommentID string `json:"comment_id"`
}

func (report *CreateReportComment) Validate() error {
	return validation.ValidateStruct(report,
		validation.Field(&report.ID, validation.Required),
		validation.Field(&report.CommentID, validation.Required),
		validation.Field(&report.Cause, validation.Required))
}

func (report *CreateReportComment) ToDomain() domain.CommentReport {
	return domain.CommentReport{
		ID:        report.ID,
		Cause:     report.Cause,
		CommentID: report.CommentID,
	}
}

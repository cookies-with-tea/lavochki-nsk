package reports

import (
	"context"

	"benches/internal/domain"
	reportsService "benches/internal/service/reports"
)

type Policy struct {
	reportsService reportsService.Service
}

func NewPolicy(reportsService reportsService.Service) *Policy {
	return &Policy{reportsService: reportsService}
}

func (policy *Policy) GetCommentsReports(ctx context.Context, isActive bool) ([]*domain.CommentReport, error) {
	return policy.reportsService.GetCommentsReports(ctx, isActive)
}

func (policy *Policy) CreateReportComment(ctx context.Context, report domain.CommentReport) error {
	return policy.reportsService.CreateReportComment(ctx, report)
}

func (policy *Policy) IsExistsReportComment(ctx context.Context, reportID, userID string) (bool, error) {
	return policy.reportsService.IsExistsReportComment(ctx, reportID, userID)
}

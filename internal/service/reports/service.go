package reports

import (
	"benches/internal/domain"
	"benches/internal/repository/postgres/reports"
	"context"

	"go.uber.org/zap"
)

type Service interface {
	GetCommentsReports(ctx context.Context, isActive bool) ([]*domain.CommentReport, error)
	CreateReportComment(ctx context.Context, report domain.CommentReport) error
	IsExistsReportComment(ctx context.Context, reportID, userID string) (bool, error)
}

type service struct {
	log *zap.Logger
	db  reports.Repository
}

func NewService(db reports.Repository, log *zap.Logger) Service {
	return &service{
		log: log,
		db:  db,
	}
}

func (service *service) GetCommentsReports(ctx context.Context, isActive bool) ([]*domain.CommentReport, error) {
	all, errGetAll := service.db.All(ctx, isActive)
	if errGetAll != nil {
		service.log.Error("get all comments", zap.Error(errGetAll))
		return nil, errGetAll
	}
	return all, nil
}

func (service *service) CreateReportComment(ctx context.Context, report domain.CommentReport) error {
	err := service.db.CreateReportComment(ctx, report)
	if err != nil {
		service.log.Error("create report comment", zap.Error(err))
		return err
	}
	return nil
}

func (service *service) IsExistsReportComment(ctx context.Context, reportID, userID string) (bool, error) {
	isExists, errIsExists := service.db.IsExistsReportComment(ctx, reportID, userID)

	if errIsExists != nil {
		service.log.Error("is exists report", zap.Error(errIsExists))
		return isExists, errIsExists
	}

	return isExists, nil
}

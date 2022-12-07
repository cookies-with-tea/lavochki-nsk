package comments

import (
	"benches/internal/domain"
	"benches/internal/repository/postgres"
	"context"
	"go.uber.org/zap"
)

type Service interface {
	GetAllCommentByBench(ctx context.Context, id string) ([]domain.Comment, error)
}

type service struct {
	db  postgres.CommentsRepository
	log *zap.Logger
}

func NewService(db postgres.CommentsRepository, log *zap.Logger) Service {
	return &service{
		db:  db,
		log: log,
	}
}

func (service *service) GetAllCommentByBench(ctx context.Context, benchID string) ([]domain.Comment, error) {
	comments, err := service.db.GetByBenchID(ctx, benchID)
	if err != nil {
		return comments, err
	}

	var nestedComments []domain.Comment
	for idx := range comments {
		nestedComments, err = service.db.GetByParentID(ctx, comments[idx].ID)
		if err != nil {
			return comments, err
		}
		comments[idx].NestedComments = nestedComments
	}

	return comments, nil
}

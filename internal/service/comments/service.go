package comments

import (
	"benches/internal/apperror"
	"benches/internal/domain"
	"benches/internal/repository/postgres/comments"
	"context"
	"go.uber.org/zap"
)

type Service interface {
	GetAllCommentByBench(ctx context.Context, id string) ([]*domain.Comment, error)
	CreateComment(ctx context.Context, comment domain.Comment) error
	UpdateComment(ctx context.Context, comment domain.Comment) error
	IsOwner(ctx context.Context, commentID string, userID string) (bool, error)
	DeleteComment(ctx context.Context, id string) error
}

type service struct {
	db  comments.Repository
	log *zap.Logger
}

func NewService(db comments.Repository, log *zap.Logger) Service {
	return &service{
		db:  db,
		log: log,
	}
}

func (service *service) GetAllCommentByBench(ctx context.Context, benchID string) ([]*domain.Comment, error) {
	all, err := service.db.ByBenchID(ctx, benchID)
	if err != nil {
		return all, err
	}

	var nestedComments []*domain.Comment
	for idx := range all {
		nestedComments, err = service.db.ByParentID(ctx, all[idx].ID)
		if err != nil {
			return nil, err
		}
		all[idx].NestedComments = nestedComments
	}

	return all, nil
}

func (service *service) CreateComment(ctx context.Context, comment domain.Comment) error {
	err := service.db.Create(ctx, comment)
	if err != nil {
		return apperror.ErrFailedToCreate
	}
	return nil
}

func (service *service) UpdateComment(ctx context.Context, comment domain.Comment) error {
	err := service.db.Update(ctx, comment.ID, comment)
	if err != nil {
		service.log.Error("error update comment", zap.Error(err))
		return err
	}

	return nil
}

func (service *service) IsOwner(ctx context.Context, commentID string, userID string) (bool, error) {
	comment, errGetComment := service.db.ByID(ctx, commentID)
	if errGetComment != nil {
		service.log.Error("error get comment", zap.Error(errGetComment))
		return false, errGetComment
	}
	return userID == comment.AuthorID, nil
}

func (service *service) DeleteComment(ctx context.Context, id string) error {
	err := service.db.Delete(ctx, id)
	if err != nil {
		service.log.Error("failed delete comment", zap.String("id", id), zap.Error(err))
		return apperror.ErrFailedToDelete
	}

	return nil
}

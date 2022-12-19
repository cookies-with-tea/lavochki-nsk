package comments

import (
	"benches/internal/apperror"
	"benches/internal/domain"
	"benches/internal/repository/postgres"
	"context"
	"go.uber.org/zap"
)

type Service interface {
	GetAllCommentByBench(ctx context.Context, id string) ([]domain.Comment, error)
	CreateComment(ctx context.Context, comment domain.Comment) error
	UpdateComment(ctx context.Context, comment domain.Comment) error
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

func (service *service) CreateComment(ctx context.Context, comment domain.Comment) error {
	err := service.db.CreateComment(ctx, comment)
	if err != nil {
		return apperror.ErrFailedToCreate
	}
	return nil
}

func (service *service) UpdateComment(ctx context.Context, comment domain.Comment) error {
	oldComment, errGetComment := service.db.GetByID(ctx, comment.ID)
	if errGetComment != nil {
		return errGetComment
	}

	userID := ctx.Value("userID").(string)
	if oldComment.AuthorID != userID {
		return apperror.ErrNotEnoughRights
	}

	err := service.db.Update(ctx, comment)
	if err != nil {
		service.log.Error("error update comment", zap.Error(err))
		return err
	}

	return nil
}

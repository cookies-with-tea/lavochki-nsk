package comments

import (
	"benches/internal/domain"
	commentsService "benches/internal/service/comments"
	usersService "benches/internal/service/users"
	"context"
)

type Policy struct {
	commentsService commentsService.Service
	usersService    usersService.Service
}

func NewPolicy(commentsService commentsService.Service, usersService usersService.Service) *Policy {
	return &Policy{
		commentsService: commentsService,
		usersService:    usersService,
	}
}

func (policy *Policy) GetAllCommentByBench(ctx context.Context, id string) ([]*domain.Comment, error) {
	return policy.commentsService.GetAllCommentByBench(ctx, id)
}

func (policy *Policy) CreateComment(ctx context.Context, userID string, comment domain.Comment) error {
	// Получение пользователя, который хочет создать комментарий
	user, errGetUser := policy.usersService.GetUserByID(ctx, userID)
	if errGetUser != nil {
		return errGetUser
	}

	comment.AuthorID = user.ID

	return policy.commentsService.CreateComment(ctx, comment)
}

func (policy *Policy) UpdateComment(ctx context.Context, comment domain.Comment) error {
	return policy.commentsService.UpdateComment(ctx, comment)
}

func (policy *Policy) IsOwner(ctx context.Context, commentID string, userID string) (bool, error) {
	return policy.commentsService.IsOwner(ctx, commentID, userID)
}

func (policy *Policy) DeleteComment(ctx context.Context, commentID string) error {
	return policy.commentsService.DeleteComment(ctx, commentID)
}

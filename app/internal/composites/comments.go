package composites

import (
	commentsPolicy "benches/internal/policy/comments"
	commentsRepository "benches/internal/repository/postgres/comments"
	commentsService "benches/internal/service/comments"
	commentsPrivate "benches/internal/transport/httpv1/private/comments"
	commentsPublic "benches/internal/transport/httpv1/public/comments"

	"go.uber.org/zap"
)

type CommentComposite struct {
	Repository     commentsRepository.Repository
	Service        commentsService.Service
	Policy         *commentsPolicy.Policy
	PrivateHandler *commentsPrivate.Handler
	PublicHandler  *commentsPublic.Handler
}

func NewCommentComposite(databases *DatabaseComposite, users *UserComposite, logger *zap.Logger) *CommentComposite {
	repository := commentsRepository.NewCommentsRepository(databases.PostgreSQL)
	service := commentsService.NewService(repository, logger)
	policy := commentsPolicy.NewPolicy(service, users.Service)
	privateHandler := commentsPrivate.NewHandler(policy)
	publicHandler := commentsPublic.NewHandler(policy)

	return &CommentComposite{
		Repository:     repository,
		Service:        service,
		Policy:         policy,
		PrivateHandler: privateHandler,
		PublicHandler:  publicHandler,
	}
}

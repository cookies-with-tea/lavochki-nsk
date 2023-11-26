package composites

import (
	tagsPolicy "benches/internal/policy/tags"
	tagsRepository "benches/internal/repository/postgres/tags"
	tagsService "benches/internal/service/tags"
	tagsPrivate "benches/internal/transport/httpv1/private/tags"
	tagsPublic "benches/internal/transport/httpv1/public/tags"

	"go.uber.org/zap"
)

type TagComposite struct {
	Repository     tagsRepository.Repository
	Service        tagsService.Service
	Policy         *tagsPolicy.Policy
	PublicHandler  *tagsPublic.Handler
	PrivateHandler *tagsPrivate.Handler
}

func NewTagComposite(databases *DatabaseComposite, logger *zap.Logger) *TagComposite {
	repository := tagsRepository.NewTagsRepository(databases.PostgreSQL)
	service := tagsService.NewService(repository, logger)
	policy := tagsPolicy.NewPolicy(service)
	publicHandler := tagsPublic.NewHandler(policy)
	privateHandler := tagsPrivate.NewHandler(policy)

	return &TagComposite{
		Repository:     repository,
		Service:        service,
		Policy:         policy,
		PublicHandler:  publicHandler,
		PrivateHandler: privateHandler,
	}
}

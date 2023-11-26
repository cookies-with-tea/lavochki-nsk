package composites

import (
	benchesPolicy "benches/internal/policy/benches"
	benchesRepository "benches/internal/repository/postgres/benches"
	benchesService "benches/internal/service/benches"
	benchesPrivate "benches/internal/transport/httpv1/private/benches"
	benchesPublic "benches/internal/transport/httpv1/public/benches"
	"benches/pkg/maps"

	"go.uber.org/zap"
)

type BenchComposite struct {
	Repository     benchesRepository.Repository
	Service        benchesService.Service
	Policy         *benchesPolicy.Policy
	PrivateHandler *benchesPrivate.Handler
	PublicHandler  *benchesPublic.Handler
}

func NewBenchComposite(databases *DatabaseComposite, users *UserComposite, notifications *NotificationComposite, tags *TagComposite, geo maps.GeoCoder, logger *zap.Logger) *BenchComposite {
	repository := benchesRepository.NewBenchesRepository(databases.PostgreSQL)
	service := benchesService.NewService(repository, databases.Minio, logger)
	policy := benchesPolicy.NewPolicy(service, users.Service, notifications.Service, tags.Service, geo, logger)
	publicHandler := benchesPublic.NewHandler(policy)
	privateHandler := benchesPrivate.NewHandler(policy)

	return &BenchComposite{
		Repository:     repository,
		Service:        service,
		Policy:         policy,
		PrivateHandler: privateHandler,
		PublicHandler:  publicHandler,
	}
}

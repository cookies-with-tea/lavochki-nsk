package composites

import (
	districtsPolicy "benches/internal/policy/districts"
	districtsRepository "benches/internal/repository/postgres/districts"
	districtsService "benches/internal/service/districts"
	districtsPublic "benches/internal/transport/httpv1/public/districts"

	"go.uber.org/zap"
)

type DistrictsComposite struct {
	Repository    districtsRepository.Repository
	Service       districtsService.Service
	Policy        *districtsPolicy.Policy
	PublicHandler *districtsPublic.Handler
}

func NewDistrictsComposite(
	databases *DatabaseComposite,
	logger *zap.Logger,
) *DistrictsComposite {
	repository := districtsRepository.NewDistrictsRepository(databases.PostgreSQL)
	service := districtsService.NewService(repository, logger)
	policy := districtsPolicy.NewPolicy(service, logger)

	publicHandler := districtsPublic.NewHandler(policy)

	return &DistrictsComposite{Repository: *repository, Service: *service, Policy: policy, PublicHandler: publicHandler}
}

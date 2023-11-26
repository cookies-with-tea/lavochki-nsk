package composites

import (
	reportsPolicy "benches/internal/policy/reports"
	reportsRepository "benches/internal/repository/postgres/reports"
	reportsService "benches/internal/service/reports"
	reportsPrivate "benches/internal/transport/httpv1/private/reports"

	"go.uber.org/zap"
)

type ReportComposite struct {
	Repository     reportsRepository.Repository
	Service        reportsService.Service
	Policy         *reportsPolicy.Policy
	PrivateHandler *reportsPrivate.Handler
}

func NewReportComposite(databases *DatabaseComposite, logger *zap.Logger) *ReportComposite {
	repository := reportsRepository.NewReportsRepository(databases.PostgreSQL)
	service := reportsService.NewService(repository, logger)
	policy := reportsPolicy.NewPolicy(service)
	handler := reportsPrivate.NewHandler(policy)

	return &ReportComposite{
		Repository:     repository,
		Service:        service,
		Policy:         policy,
		PrivateHandler: handler,
	}
}

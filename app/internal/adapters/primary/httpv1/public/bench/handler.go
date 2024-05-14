package bench

import (
	"benches/internal/adapters/primary/httpv1"
	"benches/internal/application/bench"
	"benches/pkg/api/paginate"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
)

const (
	urlAll = "/"
)

type Handler struct {
	httpv1.BaseHandler
	service *bench.Service
	logger  *slog.Logger
}

func NewHandler(service *bench.Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (handler *Handler) Register(router chi.Router) {
	router.HandleFunc(urlAll, paginate.Middleware(handler.GetAllBenches, 50, 50))
}

func (handler *Handler) GetAllBenches(writer http.ResponseWriter, request *http.Request) {
	all, err := handler.service.GetAllBenches(request.Context())
	if err != nil {
		// TODO: Отдать ошибку.
		handler.logger.Error("failed get all benches", slog.Any("error", err))
		return
	}

	output := BenchesListOutput{}
	output.FromDomain(all, 1, 1)

	handler.ResponseJson(writer, httpv1.NewResponse(output, nil, nil), http.StatusOK)
}

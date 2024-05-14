package district

import (
	"benches/internal/adapters/primary/httpv1"
	"benches/internal/application/district"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
)

const (
	urlAll = "/"
)

type Handler struct {
	httpv1.BaseHandler
	service *district.Service
	logger  *slog.Logger
}

func NewHandler(service *district.Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (handler *Handler) Register(router chi.Router) {
	router.HandleFunc(urlAll, handler.GetAllDistricts)
}

// @Summary Получение районов
// @Tags Districts
// @Produce json
// @Success 200 {object} []DistrictOutput
// @Failure 500
// @Router /api/v1/public/districts [get]
func (handler *Handler) GetAllDistricts(writer http.ResponseWriter, request *http.Request) {
	all, err := handler.service.GetAllDistricts(request.Context())
	if err != nil {
		handler.logger.Error("failed get all districts", slog.Any("error", err))
		handler.ResponseJson(writer, httpv1.NewResponse(nil, nil, nil), http.StatusTeapot)
		return
	}

	handler.ResponseJson(writer, httpv1.NewResponse(OutputFromDomains(all), nil, nil), http.StatusOK)
}

package bench

import (
	"benches/internal/adapters/primary/httpv1"
	"benches/internal/application/bench"
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
)

const (
	urlCreateBench = "/"
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
	router.Post(urlCreateBench, handler.CreateBench)
}

// @Summary Создание лавочки
// @Tags Benches
// @Produce json
// @Param Authorization header string true "Bearer"
// @Param user body CreateBenchInput true "Информация о лавочке"
// @Success 201 {object} BenchOutput
// @Failure 400
// @Failure 418
// @Router /api/v1/private/benches [post]
func (handler *Handler) CreateBench(writer http.ResponseWriter, request *http.Request) {
	dto := CreateBenchInput{}
	if err := json.NewDecoder(request.Body).Decode(&dto); err != nil {
		handler.ResponseJson(writer, httpv1.NewResponse(nil, nil, nil), http.StatusUnprocessableEntity)
		return
	}

	if err := dto.Validate(); err != nil {
		details, _ := json.Marshal(err)
		handler.ResponseJson(writer, httpv1.NewResponse(nil, nil, details), http.StatusUnprocessableEntity)
		return
	}

	userID := request.Context().Value("userID").(string)

	dto.OwnerID = userID
	bench, err := handler.service.CreateBench(request.Context(), dto.ToDomain())
	if err != nil {
		handler.logger.Error("failed create bench", slog.Any("error", err))
		return
	}

	output := BenchOutput{}
	output.FromDomain(bench)

	handler.ResponseJson(writer, httpv1.NewResponse(output, nil, nil), http.StatusCreated)
}

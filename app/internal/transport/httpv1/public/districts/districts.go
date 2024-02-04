package districts

import (
	"net/http"

	"benches/internal/apperror"
	_ "benches/internal/domain"
	"benches/internal/policy/districts"
	"benches/internal/transport/httpv1"

	"github.com/gorilla/mux"
)

type Handler struct {
	httpv1.BaseHandler
	policy *districts.Policy
}

const (
	urlListDistricts = ""
)

func NewHandler(policy *districts.Policy) *Handler {
	return &Handler{policy: policy}
}

func (handler *Handler) Register(router *mux.Router) {
	router.HandleFunc(urlListDistricts, apperror.Middleware(handler.listDistricts)).Methods(http.MethodGet)
}

// @Summary List districts
// @Description Get a list of districts
// @Tags Districts
// @Success 200 {object} []domain.District
// @Router /api/v1/public/districts [get]
func (handler *Handler) listDistricts(writer http.ResponseWriter, request *http.Request) error {
	all, errGetAll := handler.policy.GetAllDistricts(
		request.Context(),
	)

	if errGetAll != nil {
		return errGetAll
	}

	handler.ResponseJson(writer, all, http.StatusOK)
	return nil
}

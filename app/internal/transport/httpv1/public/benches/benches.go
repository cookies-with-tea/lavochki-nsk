package benches

import (
	"net/http"

	"benches/internal/apperror"
	_ "benches/internal/domain"
	"benches/internal/policy/benches"
	"benches/internal/transport/httpv1"
	"benches/pkg/api/paginate"
	"benches/pkg/api/sort"
	"benches/pkg/auth"

	"github.com/gorilla/mux"
)

type Handler struct {
	httpv1.BaseHandler
	policy *benches.Policy
}

const (
	urlDetailBench    = "/{id}"
	urlAllBenches     = "/all"
	urlListBenches    = ""
	urlNearestBenches = "/nearest/{id}"
)

func NewHandler(benches *benches.Policy) *Handler {
	return &Handler{policy: benches}
}

func (handler *Handler) Register(router *mux.Router, authManager *auth.Manager) {
	router.HandleFunc(urlAllBenches, apperror.Middleware(handler.allListBenches)).Methods("GET")
	router.HandleFunc(urlNearestBenches, apperror.Middleware(handler.nearestBenches)).Methods("GET")
	router.HandleFunc(urlListBenches, paginate.Middleware(sort.Middleware(
		apperror.Middleware(handler.listBenches), "id", sort.ASC), 1, 10)).Methods("GET")

	// Общий endpoint для получения детальной информации о лавочке
	router.HandleFunc(urlDetailBench, authManager.JWTMiddlewareHandler(apperror.Middleware(handler.detailBench))).Methods("GET")
}

// @Summary All list benches
// @Description Get all the benches
// @Tags Benches
// @Success 200 {object} domain.BenchesList
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/benches [get]
func (handler *Handler) allListBenches(writer http.ResponseWriter, request *http.Request) error {
	all, errGetAll := handler.policy.GetListBenches(
		request.Context(), true, nil, nil)

	if errGetAll != nil {
		return errGetAll
	}

	handler.ResponseJson(writer, all, 200)
	return nil
}

// @Summary List benches with filtering and pagination
// @Description Get a list of benches with filtering and pagination
// @Tags Benches
// @Param sort_by query string false "sort field"
// @Param sort_order query string false "sort order"
// @Param page query int false "page"
// @Param per_page query int false "per page"
// @Success 200 {object} domain.BenchesList
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/benches [get]
func (handler *Handler) listBenches(writer http.ResponseWriter, request *http.Request) error {
	// Получаем параметры для сортировки
	var sortOptions *sort.Options
	if options, ok := request.Context().Value(sort.OptionsContextKey).(sort.Options); ok {
		sortOptions = &options
	}

	// Получаем параметры для пагинации
	var paginateOptions *paginate.Options
	if options, ok := request.Context().Value(paginate.OptionsContextKey).(paginate.Options); ok {
		paginateOptions = &options
	}

	all, err := handler.policy.GetListBenches(request.Context(), true, sortOptions, paginateOptions)
	if err != nil {
		return err
	}
	handler.ResponseJson(writer, all, 200)
	return nil
}

// @Summary Detail bench
// @Description Get detail active bench
// @Tags Benches
// @Success 200 {object} domain.Bench
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/benches/{id} [get]
func (handler *Handler) detailBench(w http.ResponseWriter, r *http.Request) error {
	id := mux.Vars(r)["id"]
	bench, err := handler.policy.GetDetailBench(r.Context(), id, r.Context().Value("userID").(string))
	if err != nil {
		return err
	}

	handler.ResponseJson(w, bench, http.StatusOK)
	return nil
}

// @Summary Get the nearest benches
// @Description Get the nearest benches by bench
// @Tags Benches
// @Param id path string true "Bench ID"
// @Success 200
// @Failure 400 {object} apperror.AppError
// @Failure 418
// @Router /api/v1/benches/nearest/{id} [get]
func (handler *Handler) nearestBenches(writer http.ResponseWriter, request *http.Request) error {
	idBench := mux.Vars(request)["id"]

	all, errGetBenches := handler.policy.GetNearestBenches(request.Context(), idBench)
	if errGetBenches != nil {
		return errGetBenches
	}

	handler.ResponseJson(writer, all, http.StatusOK)
	return nil
}

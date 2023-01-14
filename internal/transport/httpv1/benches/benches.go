package benches

import (
	"benches/internal/apperror"
	_ "benches/internal/domain"
	"benches/internal/dto"
	"benches/internal/policy/benches"
	"benches/pkg/api/sort"
	"benches/pkg/auth"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	policy *benches.Policy
}

func NewHandler(benches *benches.Policy) *Handler {
	return &Handler{policy: benches}
}

func (handler *Handler) Register(router *mux.Router, authManager *auth.Manager) {
	router.HandleFunc("", sort.Middleware(apperror.Middleware(handler.listBenches), "id", sort.ASC)).Methods("GET")

	// Создание лавочки через telegram
	routerCreateBenches := router.NewRoute().Subrouter()
	routerCreateBenches.Use(authManager.JWTRoleMiddleware("bot"))
	routerCreateBenches.HandleFunc("/telegram", apperror.Middleware(handler.addBenchViaTelegram)).Methods("POST")

	// Роутер для функционала модерации
	routerModeration := router.NewRoute().Subrouter()
	routerModeration.Use(authManager.JWTRoleMiddleware("admin"))
	// Получение списка всех лавочек на модерации
	routerModeration.HandleFunc("/moderation", sort.Middleware(apperror.Middleware(handler.listModerationBench), "id", sort.ASC)).Methods("GET")
	// Одобрение или отказ лавочки
	routerModeration.HandleFunc("/moderation", apperror.Middleware(handler.decisionBench)).Methods("POST")
	// Создание лавочки
	routerModeration.HandleFunc("", apperror.Middleware(handler.createBench)).Methods("POST")
	// Обновление лавочки
	routerModeration.HandleFunc("/{id}", apperror.Middleware(handler.updateBench)).Methods("PATCH")
	// Удаление лавочки
	routerModeration.HandleFunc("/{id}", apperror.Middleware(handler.deleteBench)).Methods("DELETE")

	router.HandleFunc("/{id}", apperror.Middleware(handler.detailBench)).Methods("GET")
}

// @Summary List benches
// @Description Get list active benches
// @Tags Benches
// @Param sort_by query string false "sort field"
// @Param sort_order query string false "sort order"
// @Success 200 {object} []domain.Bench
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/benches [get]
func (handler *Handler) listBenches(w http.ResponseWriter, r *http.Request) error {
	var sortOptions sort.Options
	if options, ok := r.Context().Value(sort.OptionsContextKey).(sort.Options); ok {
		sortOptions = options
	}

	all, err := handler.policy.GetListBenches(r.Context(), true, sortOptions)
	if err != nil {
		return err
	}
	handler.ResponseJson(w, all, 200)
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
	bench, err := handler.policy.GetBenchByID(r.Context(), id)
	if err != nil {
		return err
	}

	if !bench.IsActive {
		return apperror.ErrNotFound
	}
	handler.ResponseJson(w, bench, http.StatusOK)
	return nil
}

// @Summary Create bench via telegram
// @Tags Benches Moderation
// @Produce json
// @Param CreateBenchViaTelegram body dto.CreateBenchViaTelegram true "bench data"
// @Success 201
// @Failure 400
// @Router /api/v1/benches/telegram [post]
func (handler *Handler) addBenchViaTelegram(w http.ResponseWriter, r *http.Request) error {
	var bench dto.CreateBenchViaTelegram
	if err := json.NewDecoder(r.Body).Decode(&bench); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if err := bench.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	err := handler.policy.CreateBenchViaTelegram(r.Context(), bench.UserTelegramID, bench.Images, bench.ToDomain())
	if err != nil {
		return err
	}
	w.WriteHeader(http.StatusCreated)
	return nil
}

// @Summary Create bench
// @Tags Benches Moderation
// @Produce json
// @Param Bench body dto.CreateBench true "bench data"
// @Param Authorization header string true "Bearer"
// @Success 201
// @Failure 400
// @Failure 418
// @Router /api/v1/benches [post]
func (handler *Handler) createBench(writer http.ResponseWriter, request *http.Request) error {
	var bench dto.CreateBench

	if err := json.NewDecoder(request.Body).Decode(&bench); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if err := bench.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	// Создаём лавочку
	errCreate := handler.policy.CreateBench(request.Context(), bench.ToDomain())
	if errCreate != nil {
		return apperror.ErrFailedToCreate
	}

	writer.WriteHeader(http.StatusCreated)
	return nil
}

// @Summary Update bench
// @Tags Benches Moderation
// @Produce json
// @Param Bench body dto.UpdateBench true "bench data"
// @Param Authorization header string true "Bearer"
// @Param id path string true "Bench ID"
// @Success 201
// @Failure 400 {object} apperror.AppError
// @Failure 418
// @Router /api/v1/benches/{id} [patch]
func (handler *Handler) updateBench(writer http.ResponseWriter, request *http.Request) error {
	var bench dto.UpdateBench

	if err := json.NewDecoder(request.Body).Decode(&bench); err != nil {
		return apperror.ErrDecodeData
	}

	idBench := mux.Vars(request)["id"]

	errUpdate := handler.policy.UpdateBench(request.Context(), idBench, bench.ToDomain())
	if errUpdate != nil {
		return errUpdate
	}

	writer.WriteHeader(http.StatusOK)

	return nil
}

// @Summary Delete bench
// @Description Delete bench by ID
// @Tags Benches Moderation
// @Param Authorization header string true "Bearer"
// @Param id path string true "Bench ID"
// @Success 200
// @Failure 400 {object} apperror.AppError
// @Failure 418
// @Router /api/v1/benches/{id} [delete]
func (handler *Handler) deleteBench(writer http.ResponseWriter, request *http.Request) error {
	idBench := mux.Vars(request)["id"]

	errDelete := handler.policy.DeleteBench(request.Context(), idBench)
	if errDelete != nil {
		return errDelete
	}

	writer.WriteHeader(http.StatusOK)

	return nil
}

// @Summary Moderation list benches
// @Description Get list moderation benches
// @Tags Benches Moderation
// @Param Authorization header string true "Bearer"
// @Success 200 {object} []domain.Bench
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/benches/moderation [get]
func (handler *Handler) listModerationBench(w http.ResponseWriter, r *http.Request) error {
	var sortOptions sort.Options
	if options, ok := r.Context().Value(sort.OptionsContextKey).(sort.Options); ok {
		sortOptions = options
	}

	all, err := handler.policy.GetListBenches(r.Context(), false, sortOptions)
	if err != nil {
		return err
	}

	handler.ResponseJson(w, all, http.StatusOK)
	return nil
}

// @Summary Decision bench
// @Description Accept or reject a bench
// @Tags Benches Moderation
// @Param Decision body dto.DecisionBench true "decision bench data"
// @Param Authorization header string true "Bearer"
// @Success 200
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/benches/moderation [post]
func (handler *Handler) decisionBench(writer http.ResponseWriter, request *http.Request) error {
	var decisionBench dto.DecisionBench
	if err := json.NewDecoder(request.Body).Decode(&decisionBench); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if err := decisionBench.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	err := handler.policy.DecisionBench(request.Context(), decisionBench.ID, decisionBench.Decision, decisionBench.Message)
	if err != nil {
		return err
	}
	handler.ResponseJson(writer, map[string]string{"result": "okay"}, http.StatusAccepted)
	return nil
}

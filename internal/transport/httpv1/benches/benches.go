package benches

import (
	"benches/internal/apperror"
	_ "benches/internal/domain"
	"benches/internal/dto"
	benchesService "benches/internal/service/benches"
	"benches/pkg/auth"
	"database/sql"
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	benches benchesService.Service
}

func NewBenchesHandler(benches benchesService.Service) *Handler {
	return &Handler{benches: benches}
}

func (h *Handler) Register(router *mux.Router, authManager *auth.Manager) {
	router.HandleFunc("/", apperror.Middleware(h.listBenches)).Methods("GET")

	// Создание лавочки через telegram
	routerCreateBenches := router.NewRoute().Subrouter()
	routerCreateBenches.Use(authManager.JWTRoleMiddleware("bot"))
	routerCreateBenches.HandleFunc("/telegram", apperror.Middleware(h.addBenchViaTelegram)).Methods("POST")

	// Роутер для функционала модерации
	routerModeration := router.NewRoute().Subrouter()
	routerModeration.Use(authManager.JWTRoleMiddleware("admin"))
	// Получение списка всех лавочек на модерации
	routerModeration.HandleFunc("/moderation", apperror.Middleware(h.listModerationBench)).Methods("GET")
	// Одобрение или отказ лавочки
	routerModeration.HandleFunc("/moderation", apperror.Middleware(h.decisionBench)).Methods("POST")

	router.HandleFunc("/{id}", apperror.Middleware(h.detailBench)).Methods("GET")
}

// @Summary List benches
// @Description Get list active benches
// @Tags Benches
// @Success 200 {object} []domain.Bench
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/benches/ [get]
func (h *Handler) listBenches(w http.ResponseWriter, r *http.Request) error {
	benches, err := h.benches.GetListBenches(r.Context(), true)
	if err != nil {
		return err
	}
	h.ResponseJson(w, benches, 200)
	return nil
}

// @Summary Detail bench
// @Description Get detail active bench
// @Tags Benches
// @Success 200 {object} domain.Bench
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/benches/{id} [get]
func (h *Handler) detailBench(w http.ResponseWriter, r *http.Request) error {
	id := mux.Vars(r)["id"]
	bench, err := h.benches.GetBenchByID(r.Context(), id)
	if !bench.IsActive {
		return apperror.ErrNotFound
	}
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return apperror.ErrNotFound
		}
		return err
	}
	h.ResponseJson(w, bench, http.StatusOK)
	return nil
}

// @Summary Create bench via telegram
// @Tags Benches Moderation
// @Produce json
// @Param CreateBenchViaTelegram body dto.CreateBenchViaTelegram true "bench data"
// @Success 201
// @Failure 400
// @Router /api/v1/benches/telegram [post]
func (h *Handler) addBenchViaTelegram(w http.ResponseWriter, r *http.Request) error {
	var bench dto.CreateBenchViaTelegram
	if err := json.NewDecoder(r.Body).Decode(&bench); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if err := bench.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	err := h.benches.CreateBenchViaTelegram(r.Context(), bench)
	if err != nil {
		return err
	}
	w.WriteHeader(http.StatusCreated)
	return nil
}

// @Summary Moderation list benches
// @Description Get list moderation benches
// @Tags Benches Moderation
// @Param Authorization header string true "Bearer"
// @Success 200 {object} []domain.Bench
// @Failure 400 {object} apperror.AppError
// @Router /api/v1/benches/moderation [get]
func (h *Handler) listModerationBench(w http.ResponseWriter, r *http.Request) error {
	benches, err := h.benches.GetListBenches(r.Context(), false)
	if err != nil {
		return err
	}
	h.ResponseJson(w, benches, 200)
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
func (h *Handler) decisionBench(w http.ResponseWriter, r *http.Request) error {
	var decisionBench dto.DecisionBench
	if err := json.NewDecoder(r.Body).Decode(&decisionBench); err != nil {
		return apperror.ErrDecodeData
	}

	// Валидация
	if err := decisionBench.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	err := h.benches.DecisionBench(r.Context(), decisionBench)
	if err != nil {
		return err
	}
	h.ResponseJson(w, map[string]string{"result": "okay"}, http.StatusAccepted)
	return nil
}

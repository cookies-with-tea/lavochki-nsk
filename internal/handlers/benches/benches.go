package benches

import (
	"benches/internal/dto"
	benchesService "benches/internal/service/benches"
	"benches/pkg/auth"
	"encoding/json"
	"fmt"
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
	router.HandleFunc("/", h.listBenches).Methods("GET")
	router.HandleFunc("/", h.addBench).Methods("POST")

	// Создание лавочки через telegram
	router.HandleFunc("/telegram", h.addBenchViaTelegram).Methods("POST")

	routerModeration := router.NewRoute().Subrouter()
	routerModeration.Use(authManager.JWTMiddleware)
	routerModeration.HandleFunc("/moderation", h.listModerationBench).Methods("GET")
	routerModeration.HandleFunc("/moderation", h.decisionBench).Methods("POST")
}

func (h *Handler) listBenches(w http.ResponseWriter, r *http.Request) {
	benches, err := h.benches.GetListBenches(r.Context(), true)
	if err != nil {
		h.ResponseErrorJson(w, "", http.StatusBadRequest)
		return
	}
	h.ResponseJson(w, benches, 200)
}

// @Summary Create bench via telegram
// @Tags Benches
// @Produce json
// @Param create bench via telegram body dto.CreateBenchViaTelegram true "bench data"
// @Success 201
// @Failure 400
// @Router /api/v1/benches/telegram [post]
func (h *Handler) addBenchViaTelegram(w http.ResponseWriter, r *http.Request) {
	var bench dto.CreateBenchViaTelegram
	if err := json.NewDecoder(r.Body).Decode(&bench); err != nil {
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	err := h.benches.CreateBenchViaTelegram(r.Context(), bench)
	if err != nil {
		h.ResponseErrorJson(w, fmt.Sprint(err), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}

func (h *Handler) addBench(w http.ResponseWriter, r *http.Request) {
	var bench dto.CreateBench
	if err := json.NewDecoder(r.Body).Decode(&bench); err != nil {
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	err := h.benches.CreateBench(r.Context(), bench)
	if err != nil {
		h.ResponseErrorJson(w, fmt.Sprint(err), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}

func (h *Handler) listModerationBench(w http.ResponseWriter, r *http.Request) {
	role := r.Context().Value("userRole")
	if role != "admin" {
		h.ResponseErrorJson(w, "not enough rights", http.StatusForbidden)
		return
	}
	benches, err := h.benches.GetListBenches(r.Context(), false)
	if err != nil {
		h.ResponseErrorJson(w, "", http.StatusBadRequest)
		return
	}
	h.ResponseJson(w, benches, 200)
}

func (h *Handler) decisionBench(w http.ResponseWriter, r *http.Request) {
	role := r.Context().Value("userRole")
	if role != "admin" {
		h.ResponseErrorJson(w, "not enough rights", http.StatusForbidden)
		return
	}
	var decisionBench dto.DecisionBench
	if err := json.NewDecoder(r.Body).Decode(&decisionBench); err != nil {
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	err := h.benches.DecisionBench(r.Context(), decisionBench)
	if err != nil {
		h.ResponseErrorJson(w, "failed to update bench", http.StatusBadRequest)
		return
	}
	h.ResponseJson(w, map[string]string{"result": "okay"}, http.StatusAccepted)
}

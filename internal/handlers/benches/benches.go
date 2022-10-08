package benches

import (
	"benches/internal/dto"
	"benches/pkg/auth"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	benches Service
}

func NewBenchesHandler(benches Service) *Handler {
	return &Handler{benches: benches}
}

func (h *Handler) Register(router *mux.Router, roleManager *auth.RoleManager) {
	router.HandleFunc("/", h.listBenches).Methods("GET")
	router.HandleFunc("/", h.addBench).Methods("POST")

	moderationSubRouter := router.NewRoute().Subrouter()
	moderationSubRouter.Use(roleManager.JWTAndRoleMiddleware)
	moderationSubRouter.HandleFunc("/moderation", h.listModerationBench).Methods("GET")
	moderationSubRouter.HandleFunc("/moderation", h.decisionBench).Methods("POST")
}

func (h *Handler) listBenches(w http.ResponseWriter, r *http.Request) {
	benches, err := h.benches.GetListBenches(r.Context(), true)
	if err != nil {
		h.ResponseErrorJson(w, "", http.StatusBadRequest)
		return
	}
	h.ResponseJson(w, benches, 200)
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
	benches, err := h.benches.GetListBenches(r.Context(), false)
	if err != nil {
		h.ResponseErrorJson(w, "", http.StatusBadRequest)
		return
	}
	h.ResponseJson(w, benches, 200)
}

func (h *Handler) decisionBench(w http.ResponseWriter, r *http.Request) {
	var decisionBench dto.DecisionBench
	if err := json.NewDecoder(r.Body).Decode(&decisionBench); err != nil {
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	err := h.benches.DecisionBench(r.Context(), decisionBench)
	if err != nil {
		fmt.Println(err)
		h.ResponseErrorJson(w, "", http.StatusBadRequest)
		return
	}
	h.ResponseJson(w, map[string]string{"result": "okay"}, http.StatusAccepted)
}

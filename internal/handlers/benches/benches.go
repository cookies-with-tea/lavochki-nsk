package benches

import (
	"benches/internal/dto"
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

func (h *Handler) Register(router *mux.Router) {
	router.HandleFunc("/api/v1/benches", h.listBenches).Methods("GET")
	router.HandleFunc("/api/v1/benches", h.addBench).Methods("POST")
}

func (h *Handler) listBenches(w http.ResponseWriter, r *http.Request) {
	benches, err := h.benches.GetListBenches(r.Context())
	if err != nil {
		h.ResponseErrorJson(w, "", http.StatusBadRequest)
		return
	}
	h.ResponseJson(w, benches, 200)
}

func (h *Handler) addBench(w http.ResponseWriter, r *http.Request) {
	var bench dto.CreateBench
	if err := json.NewDecoder(r.Body).Decode(&bench); err != nil {
		fmt.Println(err)
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	err := h.benches.CreateBench(r.Context(), bench)
	if err != nil {
		fmt.Println(err)
		h.ResponseErrorJson(w, fmt.Sprint(err), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}

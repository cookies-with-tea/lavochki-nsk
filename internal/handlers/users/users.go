package users

import (
	"benches/internal/dto"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	users Service
}

func NewUsersHandler(users Service) *Handler {
	return &Handler{users: users}
}

func (h *Handler) Register(router *mux.Router) {
	router.HandleFunc("/api/v1/users", h.registerUser)
}

func (h *Handler) registerUser(w http.ResponseWriter, r *http.Request) {
	var user dto.CreateUser
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	token, err := h.users.LoginViaTelegram(r.Context(), user)
	if err != nil {
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	h.ResponseJson(w, map[string]string{"token": token}, 200)
}

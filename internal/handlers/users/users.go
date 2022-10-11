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
	router.HandleFunc("/api/v1/users/refresh", h.refreshToken)
}

// RegisterUser
// @Summary User registration
// @Tags Users
// @Produce json
// @Param user body dto.CreateUser true "user info"
// @Success 200
// @Failure 400
// @Router /api/v1/users [post]
func (h *Handler) registerUser(w http.ResponseWriter, r *http.Request) {
	var user dto.CreateUser
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	token, refreshToken, err := h.users.LoginViaTelegram(r.Context(), user)
	if err != nil {
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	h.ResponseJson(w, map[string]string{"access": token, "refresh": refreshToken}, 200)
}

// RefreshToken
// @Summary User refresh token
// @Tags Users
// @Produce json
// @Param Authorization header string true "Bearer"
// @Param token body dto.RefreshToken true "token info"
// @Success 200
// @Failure 400
// @Router /api/v1/users/refresh [post]
func (h *Handler) refreshToken(w http.ResponseWriter, r *http.Request) {
	var token dto.RefreshToken
	if err := json.NewDecoder(r.Body).Decode(&token); err != nil {
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	accessToken, refreshToken, err := h.users.RefreshToken(r.Context(), token.Token)
	if err != nil {
		h.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	h.ResponseJson(w, map[string]string{"access": accessToken, "refresh": refreshToken}, 200)
}

package users

import (
	"benches/internal/apperror"
	"benches/internal/dto"
	usersService "benches/internal/service/users"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	users usersService.Service
}

func NewUsersHandler(users usersService.Service) *Handler {
	return &Handler{users: users}
}

func (h *Handler) Register(router *mux.Router) {
	router.HandleFunc("/api/v1/users", apperror.Middleware(h.registerUser))
	router.HandleFunc("/api/v1/users/refresh", apperror.Middleware(h.refreshToken))
}

// RegisterUser
// @Summary User registration
// @Tags Users
// @Produce json
// @Param user body dto.CreateUser true "user info"
// @Success 200
// @Failure 400
// @Router /api/v1/users [post]
func (h *Handler) registerUser(w http.ResponseWriter, r *http.Request) error {
	var user dto.CreateUser
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		return apperror.ErrIncorrectDataAuth
	}

	// Валидация
	if err := user.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	token, refreshToken, err := h.users.LoginViaTelegram(r.Context(), user)
	if err != nil {
		fmt.Println(err)
		return apperror.ErrIncorrectDataAuth
	}
	h.ResponseJson(w, map[string]string{"access": token, "refresh": refreshToken}, 200)
	return nil
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
func (h *Handler) refreshToken(w http.ResponseWriter, r *http.Request) error {
	var token dto.RefreshToken
	if err := json.NewDecoder(r.Body).Decode(&token); err != nil {
		return apperror.ErrIncorrectDataToken
	}

	// Валидация
	if err := token.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	accessToken, refreshToken, err := h.users.RefreshToken(r.Context(), token.Token)
	if err != nil {
		fmt.Println(err)
		return apperror.ErrIncorrectDataToken
	}
	h.ResponseJson(w, map[string]string{"access": accessToken, "refresh": refreshToken}, 200)
	return nil
}

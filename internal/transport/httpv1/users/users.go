package users

import (
	"benches/internal/apperror"
	"benches/internal/dto"
	usersService "benches/internal/service/users"
	"benches/pkg/auth"
	"encoding/json"
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

func (handler *Handler) Register(router *mux.Router, authManager *auth.Manager) {
	router.HandleFunc("/api/v1/users", apperror.Middleware(handler.registerUser))
	router.HandleFunc("/api/v1/users/refresh", apperror.Middleware(handler.refreshToken))

	meUsersRouter := router.NewRoute().Subrouter()
	meUsersRouter.Use(authManager.JWTMiddleware)
	meUsersRouter.HandleFunc("/api/v1/users/me", apperror.Middleware(handler.me))
}

// RegisterUser
// @Summary User registration
// @Tags Users
// @Produce json
// @Param user body dto.CreateUser true "user info"
// @Success 200
// @Failure 400
// @Router /api/v1/users [post]
func (handler *Handler) registerUser(writer http.ResponseWriter, request *http.Request) error {
	var user dto.CreateUser
	if err := json.NewDecoder(request.Body).Decode(&user); err != nil {
		return apperror.ErrIncorrectDataAuth
	}

	// Валидация
	if err := user.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	token, refreshToken, err := handler.users.LoginViaTelegram(request.Context(), user)
	if err != nil {
		return apperror.ErrIncorrectDataAuth
	}
	handler.ResponseJson(writer, map[string]string{"access": token, "refresh": refreshToken}, 200)
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
func (handler *Handler) refreshToken(writer http.ResponseWriter, request *http.Request) error {
	var token dto.RefreshToken
	if err := json.NewDecoder(request.Body).Decode(&token); err != nil {
		return apperror.ErrIncorrectDataToken
	}

	// Валидация
	if err := token.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	accessToken, refreshToken, err := handler.users.RefreshToken(request.Context(), token.Token)
	if err != nil {
		return apperror.ErrIncorrectDataToken
	}
	handler.ResponseJson(writer, map[string]string{"access": accessToken, "refresh": refreshToken}, 200)
	return nil
}

// @Summary Get Me
// @Tags Users
// @Produce json
// @Param Authorization header string true "Bearer"
// @Success 200
// @Failure 418
// @Router /api/v1/users/me [get]
func (handler *Handler) me(writer http.ResponseWriter, request *http.Request) error {
	userID := request.Context().Value("userID").(string)

	user, errGetUser := handler.users.GetUserByID(request.Context(), userID)
	if errGetUser != nil {
		return errGetUser
	}

	handler.ResponseJson(writer, user, http.StatusOK)
	return nil
}

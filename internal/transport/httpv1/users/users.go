package users

import (
	"benches/internal/apperror"
	"benches/internal/domain"
	"benches/internal/dto"
	"benches/internal/policy/users"
	"benches/pkg/auth"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"

	_ "benches/internal/domain"
)

type Handler struct {
	baseHandler
	policy *users.Policy
}

func NewHandler(policy *users.Policy) *Handler {
	return &Handler{policy: policy}
}

func (handler *Handler) Register(router *mux.Router, authManager *auth.Manager) {
	router.HandleFunc("/api/v1/users", apperror.Middleware(handler.registerUser)).Methods("POST")
	router.HandleFunc("/api/v1/users/refresh", apperror.Middleware(handler.refreshToken))

	// Отдельная авторизация для администратора
	router.HandleFunc("/api/v1/users/admin", apperror.Middleware(handler.authorizationAdmin)).Methods("POST")

	meUsersRouter := router.NewRoute().Subrouter()
	meUsersRouter.Use(authManager.JWTMiddleware)
	meUsersRouter.HandleFunc("/api/v1/users/me", apperror.Middleware(handler.me))

	adminPanelRouter := router.NewRoute().Subrouter()
	adminPanelRouter.Use(authManager.JWTRoleMiddleware("admin"))
	adminPanelRouter.HandleFunc("/api/v1/users", apperror.Middleware(handler.listAllUsers)).Methods("GET")
}

// RegisterUser
// @Summary User registration
// @Tags Users
// @Produce json
// @Param user body dto.CreateUser true "user info"
// @Success 200 {object} domain.TokenCredentials
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

	accessToken, refreshToken, err := handler.policy.LoginViaTelegram(request.Context(), user.ToDomain())
	if err != nil {
		return apperror.ErrIncorrectDataAuth
	}
	handler.ResponseJson(writer, domain.TokenCredentials{
		Access:  accessToken,
		Refresh: refreshToken,
	}, 200)
	return nil
}

func (handler *Handler) authorizationAdmin(writer http.ResponseWriter, request *http.Request) error {
	var user dto.CreateUser
	if err := json.NewDecoder(request.Body).Decode(&user); err != nil {
		return apperror.ErrIncorrectDataAuth
	}

	// Валидация
	if err := user.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	accessToken, refreshToken, err := handler.policy.LoginViaTelegramByAdmin(request.Context(), user.ToDomain())
	if err != nil {
		return apperror.ErrIncorrectDataAuth
	}

	handler.ResponseJson(writer, domain.TokenCredentials{
		Access:  accessToken,
		Refresh: refreshToken,
	}, 200)
	return nil
}

// RefreshToken
// @Summary User refresh token
// @Tags Users
// @Produce json
// @Param Authorization header string true "Bearer"
// @Param token body dto.RefreshToken true "token info"
// @Success 200 {object} domain.TokenCredentials
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

	accessToken, refreshToken, err := handler.policy.RefreshToken(request.Context(), token.Token)
	if err != nil {
		return apperror.ErrIncorrectDataToken
	}
	handler.ResponseJson(writer, domain.TokenCredentials{
		Access:  accessToken,
		Refresh: refreshToken,
	}, 200)
	return nil
}

// @Summary Get Me
// @Tags Users
// @Produce json
// @Param Authorization header string true "Bearer"
// @Success 200 {object} domain.User
// @Success 200
// @Failure 418
// @Router /api/v1/users/me [get]
func (handler *Handler) me(writer http.ResponseWriter, request *http.Request) error {
	userID := request.Context().Value("userID").(string)

	user, errGetUser := handler.policy.GetUserByID(request.Context(), userID)
	if errGetUser != nil {
		return errGetUser
	}

	handler.ResponseJson(writer, user, http.StatusOK)
	return nil
}

// @Summary Get all users
// @Tags Users
// @Produce json
// @Param Authorization header string true "Bearer"
// @Success 200 {object} []domain.User
// @Failure 418
// @Router /api/v1/users [get]
func (handler *Handler) listAllUsers(writer http.ResponseWriter, request *http.Request) error {
	all, errGetAllUsers := handler.policy.GetAllUsers(request.Context())
	if errGetAllUsers != nil {
		return errGetAllUsers
	}

	handler.ResponseJson(writer, all, http.StatusOK)
	return nil
}

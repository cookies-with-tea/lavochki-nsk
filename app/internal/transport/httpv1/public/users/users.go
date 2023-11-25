package users

import (
	"encoding/json"
	"net/http"

	"benches/internal/apperror"
	"benches/internal/domain"
	"benches/internal/dto"
	"benches/internal/policy/users"
	"benches/internal/transport/httpv1"

	"github.com/gorilla/mux"

	_ "benches/internal/domain"
)

type Handler struct {
	httpv1.BaseHandler
	policy *users.Policy
}

const (
	urlRegisterUser = ""
	urlRefreshToken = "/refresh"
	urlAuthAdmin    = "/admin"
)

func NewHandler(policy *users.Policy) *Handler {
	return &Handler{policy: policy}
}

func (handler *Handler) Register(router *mux.Router) {
	router.HandleFunc(urlRegisterUser, apperror.Middleware(handler.registerUser)).Methods("POST")
	router.HandleFunc(urlRefreshToken, apperror.Middleware(handler.refreshToken)).Methods("POST")

	// Отдельная авторизация для администратора
	router.HandleFunc(urlAuthAdmin, apperror.Middleware(handler.authorizationAdmin)).Methods("POST")
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
	}, http.StatusOK)
	return nil
}

// AuthorizationAdmin
// @Summary Authorization Admin
// @Tags Users
// @Produce json
// @Param user body dto.CreateUser true "user info"
// @Success 200 {object} domain.TokenCredentials
// @Failure 400
// @Failure 403
// @Router /api/v1/users/admin [post]
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
	}, http.StatusOK)
	return nil
}

// RefreshToken
// @Summary User refresh token
// @Tags Users
// @Produce json
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
	}, http.StatusOK)
	return nil
}

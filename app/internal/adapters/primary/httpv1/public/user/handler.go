package user

import (
	"benches/internal/adapters/primary/httpv1"
	"benches/internal/application/user"
	"benches/internal/domain"
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
)

const (
	urlRegisterUser = "/"
	urlRefreshToken = "/refresh"
	urlAuthAdmin    = "/admin"
)

type Handler struct {
	httpv1.BaseHandler
	service *user.Service
	logger  *slog.Logger
}

func NewHandler(service *user.Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (handler *Handler) Register(router chi.Router) {
	router.HandleFunc(urlRegisterUser, handler.RegisterUser)
}

// @Summary Регистрация пользователя
// @Tags Users
// @Produce json
// @Param user body CreateUserInput true "Информация о пользователе"
// @Success 201 {object} CredentialsOutput
// @Failure 400
// @Failure 418
// @Router /api/v1/public/users [post]
func (handler *Handler) RegisterUser(writer http.ResponseWriter, request *http.Request) {
	dto := CreateUserInput{}
	if err := json.NewDecoder(request.Body).Decode(&dto); err != nil {
		handler.ResponseJson(writer, httpv1.NewResponse(nil, nil, nil), http.StatusUnprocessableEntity)
		return
	}

	if err := dto.Validate(); err != nil {
		details, _ := json.Marshal(err)
		handler.ResponseJson(writer, httpv1.NewResponse(nil, nil, details), http.StatusUnprocessableEntity)
		return
	}

	telegramUser := dto.ToDomain()

	user, err := handler.service.GetOrCreate(
		request.Context(),
		&domain.User{
			TelegramID: telegramUser.ID,
			Username:   telegramUser.Username,
		},
	)
	if err != nil {
		handler.logger.Error("failed get or create user", slog.Any("error", err))
		return
	}

	credentials, err := handler.service.LoginTelegram(request.Context(), telegramUser, user)
	if err != nil {
		handler.ResponseJson(writer, httpv1.NewResponse(nil, nil, nil), http.StatusTeapot)
		return
	}

	output := CredentialsOutput{}
	output.FromDomain(credentials)

	handler.ResponseJson(writer, httpv1.NewResponse(output, nil, nil), http.StatusOK)
}

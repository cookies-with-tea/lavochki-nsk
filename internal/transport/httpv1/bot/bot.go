package bot

import (
	"benches/internal/apperror"
	"benches/internal/dto"
	botPolicy "benches/internal/policy/bot"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	policy *botPolicy.Policy
}

func NewHandler(policy *botPolicy.Policy) *Handler {
	return &Handler{
		policy: policy,
	}
}

func (handler *Handler) Register(router *mux.Router) {
	// Авторизация бота
	router.HandleFunc("/auth", apperror.Middleware(handler.authorization))
	router.HandleFunc("/refresh", apperror.Middleware(handler.refreshToken))
}

// @Summary Authorization bot
// @Tags Bot
// @Produce json
// @Param user body dto.AuthorizationBot true "bot info"
// @Success 200
// @Failure 403
// @Router /api/v1/bot/auth [post]
func (handler *Handler) authorization(w http.ResponseWriter, r *http.Request) error {
	var bot dto.AuthorizationBot
	if err := json.NewDecoder(r.Body).Decode(&bot); err != nil {
		return apperror.ErrIncorrectDataAuth
	}

	// Валидация
	if err := bot.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	token, refreshToken, err := handler.policy.AuthorizationBot(r.Context(), bot)
	if err != nil {
		return apperror.ErrIncorrectDataAuth
	}
	handler.ResponseJson(w, map[string]string{"access": token, "refresh": refreshToken}, 200)
	return nil
}

// @Summary Bot refresh token
// @Tags Bot
// @Produce json
// @Param Authorization header string true "Bearer"
// @Param token body dto.RefreshToken true "token info"
// @Success 200
// @Failure 400
// @Router /api/v1/bot/refresh [post]
func (handler *Handler) refreshToken(w http.ResponseWriter, r *http.Request) error {
	var token dto.RefreshToken
	if err := json.NewDecoder(r.Body).Decode(&token); err != nil {
		return apperror.ErrIncorrectDataToken
	}

	// Валидация
	if err := token.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	accessToken, refreshToken, err := handler.policy.RefreshToken(r.Context(), token.Token)
	if err != nil {
		return apperror.ErrIncorrectDataToken
	}
	handler.ResponseJson(w, map[string]string{"access": accessToken, "refresh": refreshToken}, 200)
	return nil
}

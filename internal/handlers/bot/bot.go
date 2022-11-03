package bot

import (
	"benches/internal/apperror"
	"benches/internal/dto"
	"benches/internal/service/bot"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

type Handler struct {
	baseHandler
	botService bot.Service
}

func NewBotHandler(botService bot.Service) *Handler {
	return &Handler{
		botService: botService,
	}
}

func (h *Handler) Register(router *mux.Router) {
	// Авторизация бота
	router.HandleFunc("/auth", apperror.Middleware(h.authorization))
	router.HandleFunc("/refresh", apperror.Middleware(h.refreshToken))
}

// @Summary Authorization bot
// @Tags Bot
// @Produce json
// @Param user body dto.AuthorizationBot true "bot info"
// @Success 200
// @Failure 403
// @Router /api/v1/bot/auth [post]
func (h *Handler) authorization(w http.ResponseWriter, r *http.Request) error {
	var bot dto.AuthorizationBot
	if err := json.NewDecoder(r.Body).Decode(&bot); err != nil {
		return apperror.ErrIncorrectDataAuth
	}

	// Валидация
	if err := bot.Validate(); err != nil {
		details, _ := json.Marshal(err)
		return apperror.NewAppError(err, "validation error", details)
	}

	token, refreshToken, err := h.botService.AuthorizationBot(r.Context(), bot)
	if err != nil {
		return apperror.ErrIncorrectDataAuth
	}
	h.ResponseJson(w, map[string]string{"access": token, "refresh": refreshToken}, 200)
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

	accessToken, refreshToken, err := h.botService.RefreshToken(r.Context(), token.Token)
	if err != nil {
		return apperror.ErrIncorrectDataToken
	}
	h.ResponseJson(w, map[string]string{"access": accessToken, "refresh": refreshToken}, 200)
	return nil
}

package api

import (
	"benches-bot/internal/dto"
	"encoding/json"
	"github.com/NicoNex/echotron/v3"
	"github.com/gorilla/mux"
	"net/http"
)

type API struct {
	baseHandler
	bot *echotron.API
}

func NewAPI() *API {
	return &API{}
}

func (a *API) Register(router *mux.Router) {
	router.HandleFunc("/api/v1/notification", a.createUserNotification).Methods("POST")
}

func (a *API) createUserNotification(w http.ResponseWriter, r *http.Request) {
	var notification dto.CreateNotification
	if err := json.NewDecoder(r.Body).Decode(&notification); err != nil {
		a.ResponseErrorJson(w, "wrong data", http.StatusBadRequest)
		return
	}
	_, err := a.bot.SendMessage("Hello world!", notification.UserID, nil)
	if err != nil {
		a.ResponseErrorJson(w, "error send message", http.StatusBadRequest)
	}
}

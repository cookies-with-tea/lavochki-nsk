package internal

import (
	api2 "benches-bot/internal/api"
	bot2 "benches-bot/internal/bot"
	"benches-bot/internal/config"
	"context"
	"github.com/NicoNex/echotron/v3"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

type stateFn func(*echotron.Update) stateFn

type app struct {
	cfg    *config.Config
	logger *zap.Logger
}

func NewApp(logger *zap.Logger, cfg *config.Config) (*app, error) {
	return &app{
		cfg:    cfg,
		logger: logger,
	}, nil
}

func (a *app) Run() {
	a.logger.Info("Run bot")
	termChan := make(chan os.Signal, 1)
	signal.Notify(termChan, syscall.SIGINT, syscall.SIGTERM)

	// Create API
	router := mux.NewRouter()
	api := api2.NewAPI()
	api.Register(router)

	// Create Bot
	bot := bot2.NewBot(a.cfg.Telegram.Token, a.cfg.BackendServer.Url)

	// Create HTTP server
	server := &http.Server{Addr: a.cfg.HTTP.Addr, Handler: router}
	go func() {
		<-termChan
		if err := server.Shutdown(context.Background()); err != nil {
			log.Print(err)
		}
	}()

	// Start App
	dsp := echotron.NewDispatcher(a.cfg.Telegram.Token, bot.Create)
	dsp.SetHTTPServer(server)
	log.Println(dsp.ListenWebhook(a.cfg.WebHookURL))
}

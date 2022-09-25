package internal

import (
	"benches-bot/internal/config"
	"benches-bot/internal/domain"
	"bytes"
	"encoding/json"
	"github.com/NicoNex/echotron/v3"
	"go.uber.org/zap"
	"log"
	"net/http"
	"strings"
)

type stateFn func(*echotron.Update) stateFn

type app struct {
	cfg    *config.Config
	logger *zap.Logger
	bot    *bot
}

type bot struct {
	state      stateFn
	location   *domain.Location
	image      []byte
	backendUrl string
	echotron.API
}

func NewApp(logger *zap.Logger, cfg *config.Config) (*app, error) {
	return &app{
		cfg:    cfg,
		logger: logger,
	}, nil
}

func (a *app) Run() {
	a.logger.Info("Run bot")
	dsp := echotron.NewDispatcher(a.cfg.Telegram.Token, a.createBot)
	log.Println(dsp.Poll())
}

func (b *bot) handleMessage(update *echotron.Update) stateFn {
	if strings.HasPrefix(update.Message.Text, "/add") {
		_, err := b.SendMessage("Окей, отправь мне геолокацию", update.Message.Chat.ID, nil)
		if err != nil {
			panic(err)
		}
		return b.handleLocation
	}
	return b.handleMessage
}

func (b *bot) handleLocation(update *echotron.Update) stateFn {
	location := &domain.Location{}
	if update.Message.Location == nil {
		_, err := b.SendMessage("Это не похоже на локацию. Попробуй ещё раз.", update.Message.Chat.ID, nil)
		if err != nil {
			panic(err)
		}
		return b.handleMessage
	}
	location.Lat = update.Message.Location.Latitude
	location.Lng = update.Message.Location.Longitude
	b.location = location

	_, err := b.SendMessage("Отлично! Координаты установлены. Не мог бы ты теперь прислать фото?", update.Message.Chat.ID, nil)
	if err != nil {
		panic(err)
	}
	return b.handleImage
}

func (b *bot) handleImage(update *echotron.Update) stateFn {
	images := update.Message.Photo
	if len(images) == 0 {
		_, err := b.SendMessage("Это не похоже на фото. Попробуй ещё раз.", update.Message.Chat.ID, nil)
		if err != nil {
			panic(err)
		}
		return b.handleMessage
	}
	_, err := b.SendMessage("Отлично!", update.Message.Chat.ID, nil)
	if err != nil {
		panic(err)
	}
	image := images[3]
	fileInfo, _ := b.GetFile(image.FileID)
	file, _ := b.DownloadFile(fileInfo.Result.FilePath)
	b.image = file
	b.createBench()
	return b.handleMessage
}

func (b *bot) createBench() {
	model := domain.CreateBench{Lat: b.location.Lat, Lng: b.location.Lng, Image: b.image}
	jsonBody, _ := json.Marshal(model)
	_, err := http.Post(b.backendUrl, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		panic(err)
	}
}

func (b *bot) Update(update *echotron.Update) {
	b.state = b.state(update)
}

func (a *app) createBot(_ int64) echotron.Bot {
	abot := &bot{API: echotron.NewAPI(a.cfg.Telegram.Token)}
	abot.state = abot.handleMessage
	a.bot = abot
	a.bot.backendUrl = a.cfg.BackendServer.Url
	return abot
}

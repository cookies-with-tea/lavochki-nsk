package internal

import (
	"benches-bot/internal/config"
	"benches-bot/internal/domain"
	"fmt"
	"github.com/NicoNex/echotron/v3"
	"go.uber.org/zap"
	"log"
	"strings"
)

type stateFn func(*echotron.Update) stateFn

type app struct {
	cfg    *config.Config
	logger *zap.Logger
	bot    *bot
}

type bot struct {
	state    stateFn
	location *domain.Location
	image    string
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
		b.SendMessage("Окей, отправь мне геолокацию", update.Message.Chat.ID, nil)
		return b.handleImage
	}
	return b.handleMessage
}

//func (b *bot) handleLocation(update *echotron.Update) stateFn {
//	location := &domain.Location{}
//	fmt.Println(update.Message.Location)
//	if update.Message.Location == nil {
//		b.SendMessage("Это не похоже на локацию. Попробуй ещё раз.", update.Message.Chat.ID, nil)
//		return b.handleMessage
//	}
//	location.Lat = update.Message.Location.Latitude
//	location.Lng = update.Message.Location.Longitude
//	b.location = location
//
//	b.SendMessage("Отлично! Координаты установлены. Не мог бы ты теперь прислать фото?", update.Message.Chat.ID, nil)
//	return b.handleImage
//}

func (b *bot) handleImage(update *echotron.Update) stateFn {
	images := update.Message.Photo
	if len(images) == 0 {
		b.SendMessage("Это не похоже на фото. Попробуй ещё раз.", update.Message.Chat.ID, nil)
		return b.handleMessage
	}
	b.SendMessage("Отлично!", update.Message.Chat.ID, nil)
	fileInfo, err := b.GetFile(images[0].FileID)
	if err != nil {

	}
	fmt.Println(fileInfo.Result.FilePath)
	file, err := b.DownloadFile(fileInfo.Result.FilePath)
	if err != nil {
	}
	fmt.Println(file)
	return b.handleMessage
}

func (b *bot) Update(update *echotron.Update) {
	b.state = b.state(update)
}

func (a *app) createBot(chatID int64) echotron.Bot {
	abot := &bot{API: echotron.NewAPI(a.cfg.Telegram.Token)}
	abot.state = abot.handleMessage
	a.bot = abot
	return abot
}

package bot

import (
	"benches-bot/internal/domain"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/NicoNex/echotron/v3"
	"net/http"
	"strings"
)

type stateFn func(*echotron.Update) stateFn

type Bot struct {
	state      stateFn
	location   *domain.Location
	images     [][]byte
	userID     int
	backendUrl string
	echotron.API
}

func NewBot(token string, backendUrl string) *Bot {
	bot := &Bot{API: echotron.NewAPI(token)}
	bot.state = bot.handleMessage
	bot.backendUrl = backendUrl
	return bot
}

func (b *Bot) Create(_ int64) echotron.Bot {
	return b
}

func (b *Bot) handleMessage(update *echotron.Update) stateFn {
	if strings.HasPrefix(update.Message.Text, "/add") {
		_, err := b.SendMessage("Окей, отправь мне геолокацию", update.Message.Chat.ID, nil)
		if err != nil {
			fmt.Errorf("error send message: %s", err)
		}
		return b.handleLocation
	}
	return b.handleMessage
}

func (b *Bot) handleLocation(update *echotron.Update) stateFn {
	location := &domain.Location{}
	if update.Message.Location == nil {
		_, err := b.SendMessage("Это не похоже на локацию. Попробуй ещё раз.", update.Message.Chat.ID, nil)
		if err != nil {
			fmt.Errorf("error send message: %s", err)
		}
		return b.handleMessage
	}
	location.Lat = update.Message.Location.Latitude
	location.Lng = update.Message.Location.Longitude
	b.location = location

	_, err := b.SendMessage("Отлично! Координаты установлены. Не мог бы ты теперь прислать фото?", update.Message.Chat.ID, nil)
	if err != nil {
		fmt.Errorf("error send message: %s", err)
	}
	return b.handleImage
}

func (b *Bot) handleImage(update *echotron.Update) stateFn {
	if strings.HasPrefix(update.Message.Text, "/finish") {
		b.userID = int(update.Message.Chat.ID)
		b.createBench()
		_, err := b.SendMessage("Отлично!", update.Message.Chat.ID, nil)
		if err != nil {
			fmt.Errorf("error send message: %s", err)
		}
		return b.handleMessage
	}
	images := update.Message.Photo
	if len(images) == 0 {
		_, err := b.SendMessage("Это не похоже на фото. Попробуй ещё раз.", update.Message.Chat.ID, nil)
		if err != nil {
			fmt.Errorf("error send message: %s", err)
		}
		return b.handleImage
	}
	image := update.Message.Photo[3]
	fileInfo, _ := b.GetFile(image.FileID)
	file, _ := b.DownloadFile(fileInfo.Result.FilePath)
	b.images = append(b.images, file)

	return b.handleImage
}

func (b *Bot) createBench() {
	model := domain.CreateBench{Lat: b.location.Lat, Lng: b.location.Lng, Images: b.images, UserTelegramID: b.userID}
	jsonBody, _ := json.Marshal(model)
	_, err := http.Post(b.backendUrl, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		fmt.Errorf("error post request: %s", err)
	}
	b.images = make([][]byte, 0)
}

func (b *Bot) Update(update *echotron.Update) {
	b.state = b.state(update)
}

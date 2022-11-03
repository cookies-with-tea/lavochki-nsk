package bot

import (
	"benches-bot/internal/domain"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/NicoNex/echotron/v3"
	"net/http"
	"strings"
	"time"
)

type stateFn func(*echotron.Update) stateFn

type Credentials struct {
	login    string
	password string
}

type Bot struct {
	state    stateFn
	location *domain.Location
	images   [][]byte
	userID   int

	tokens      *domain.Tokens
	authService *Auth
	credentials *Credentials
	backendUrl  string
	echotron.API
}

func NewBot(token, backendUrl, login, password string, authService *Auth) *Bot {
	bot := &Bot{
		API:         echotron.NewAPI(token),
		authService: authService,
		backendUrl:  backendUrl,
		credentials: &Credentials{
			login:    login,
			password: password,
		},
	}
	bot.state = bot.handleMessage
	return bot
}

func (b *Bot) Authorization() error {
	access, refresh, err := b.authService.GetJWT(b.credentials.login, b.credentials.password)
	if err != nil {
		return err
	}
	tokens := domain.Tokens{
		Access:  access,
		Refresh: refresh,
	}
	b.tokens = &tokens
	return nil
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
		response := b.createBench()
		if response.StatusCode == http.StatusForbidden {
			b.SendMessage("Чтобы создать лавочку, пожалуйста, зарегестрируйтесь для начала на сайте", int64(b.userID), nil)
		} else {
			_, err := b.SendMessage("Отлично!", update.Message.Chat.ID, nil)
			if err != nil {
				fmt.Errorf("error send message: %s", err)
			}
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

func (b *Bot) createBench() *http.Response {
	model := domain.CreateBench{Lat: b.location.Lat, Lng: b.location.Lng, Images: b.images, UserTelegramID: b.userID}
	jsonBody, _ := json.Marshal(model)

	req, err := http.NewRequest(http.MethodPost, b.backendUrl, bytes.NewBuffer(jsonBody))
	if err != nil {
		fmt.Errorf("could not create request: %s", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", b.tokens.Access))
	client := http.Client{
		Timeout: 30 * time.Second,
	}
	response, err := client.Do(req)
	if err != nil {
		fmt.Errorf("error post request: %s", err)
	}
	if response.StatusCode == http.StatusUnauthorized && b.tokens.Refresh != "" {
		b.tokens.Access, b.tokens.Refresh, err = b.authService.Refresh(b.tokens.Refresh)
		if err != nil {
			fmt.Errorf("error post request: %s", err)
		}
	} else if response.StatusCode == http.StatusUnauthorized {
		b.tokens.Access, b.tokens.Refresh, err = b.authService.GetJWT(b.credentials.login, b.credentials.password)
		if err != nil {
			fmt.Errorf("error post request: %s", err)
		}
	}

	if response.StatusCode == http.StatusUnauthorized {
		req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", b.tokens.Access))
		response, err = client.Do(req)
		if err != nil {
			fmt.Errorf("error post request: %s", err)
		}

		if response.StatusCode == http.StatusUnauthorized {
			b.tokens.Access, b.tokens.Refresh, err = b.authService.GetJWT(b.credentials.login, b.credentials.password)
			if err != nil {
				fmt.Errorf("error post request: %s", err)
			}
		}

		req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", b.tokens.Access))
		response, err = client.Do(req)
		if err != nil {
			fmt.Errorf("error post request: %s", err)
		}
	}

	b.images = make([][]byte, 0)
	return response
}

func (b *Bot) Update(update *echotron.Update) {
	b.state = b.state(update)
}

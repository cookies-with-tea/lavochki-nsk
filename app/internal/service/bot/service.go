package bot

import (
	"context"
	"time"

	"benches/internal/apperror"
	"benches/internal/domain"
	redisStorage "benches/internal/storage/redis"
	"benches/pkg/auth"

	"go.uber.org/zap"
)

type Service interface {
	AuthorizationBot(ctx context.Context, bot domain.Bot) (string, string, error)
	RefreshToken(ctx context.Context, token string) (string, string, error)
}

type service struct {
	login    string // Логин бота для авторизации
	password string // Пароль бота для авторизации

	log          *zap.Logger
	tokenManager *auth.Manager
	redisStorage redisStorage.Storage
}

func NewService(login, password string, log *zap.Logger, tokenManager *auth.Manager, redisStorage redisStorage.Storage) Service {
	return &service{
		login:        login,
		password:     password,
		log:          log,
		tokenManager: tokenManager,
		redisStorage: redisStorage,
	}
}

// AuthorizationBot Сервис для авторизации бота.
func (service *service) AuthorizationBot(ctx context.Context, bot domain.Bot) (string, string, error) {
	if service.login != bot.Login || service.password != bot.Password {
		return "", "", apperror.ErrNotEnoughRights
	}
	var token string
	token, err := service.tokenManager.NewJWT(service.login, "bot", 15*time.Minute)
	if err != nil {
		return "", "", err
	}
	var refreshToken string
	refreshToken, err = service.tokenManager.NewRefreshToken()
	if err != nil {
		return "", "", err
	}
	err = service.redisStorage.WriteRefreshToken(ctx, refreshToken, service.login, 20*time.Minute)
	if err != nil {
		return "", "", err
	}
	return token, refreshToken, nil
}

func (service *service) RefreshToken(ctx context.Context, token string) (string, string, error) {
	botLogin, err := service.redisStorage.GetUserIDByRefreshToken(ctx, token)
	if err != nil {
		return "", "", err
	}

	var newAccessToken string
	newAccessToken, err = service.tokenManager.NewJWT(botLogin, "bot", 15*time.Minute)
	if err != nil {
		return "", "", err
	}

	newRefreshToken, err := service.tokenManager.NewRefreshToken()
	if err != nil {
		return "", "", err
	}

	err = service.redisStorage.WriteRefreshToken(ctx, newRefreshToken, botLogin, 20*time.Minute)
	if err != nil {
		return "", "", err
	}

	return newAccessToken, newRefreshToken, nil
}

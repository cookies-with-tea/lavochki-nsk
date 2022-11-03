package bot

import (
	"benches/internal/apperror"
	"benches/internal/dto"
	redisStorage "benches/internal/storage/redis"
	"benches/pkg/auth"
	"context"
	"go.uber.org/zap"
	"time"
)

type Service interface {
	AuthorizationBot(ctx context.Context, bot dto.AuthorizationBot) (string, string, error)
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

// AuthorizationBot Сервис для авторизации бота
func (s *service) AuthorizationBot(ctx context.Context, bot dto.AuthorizationBot) (string, string, error) {
	if s.login != bot.Login || s.password != bot.Password {
		return "", "", apperror.ErrNotEnoughRights
	}
	var token string
	token, err := s.tokenManager.NewJWT(s.login, "bot", 1*time.Minute)
	if err != nil {
		return "", "", err
	}
	var refreshToken string
	refreshToken, err = s.tokenManager.NewRefreshToken()
	if err != nil {
		return "", "", err
	}
	err = s.redisStorage.WriteRefreshToken(ctx, refreshToken, s.login, 15*time.Minute)
	if err != nil {
		return "", "", err
	}
	return token, refreshToken, nil
}

func (s *service) RefreshToken(ctx context.Context, token string) (string, string, error) {
	botLogin, err := s.redisStorage.GetUserIDByRefreshToken(ctx, token)
	if err != nil {
		return "", "", err
	}

	var newAccessToken string
	newAccessToken, err = s.tokenManager.NewJWT(botLogin, "bot", 15*time.Minute)
	if err != nil {
		return "", "", err
	}

	newRefreshToken, err := s.tokenManager.NewRefreshToken()
	if err != nil {
		return "", "", err
	}

	err = s.redisStorage.WriteRefreshToken(ctx, newRefreshToken, botLogin, 15*time.Minute)
	if err != nil {
		return "", "", err
	}

	return newAccessToken, newRefreshToken, nil
}

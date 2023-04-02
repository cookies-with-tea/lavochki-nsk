package users

import (
	"benches/internal/apperror"
	"benches/internal/domain"
	"benches/internal/repository/postgres/users"
	redisStorage "benches/internal/storage/redis"
	"benches/pkg/auth"
	"benches/pkg/telegram"
	"context"
	"errors"
	"fmt"
	"time"

	"go.uber.org/zap"
)

type Service interface {
	LoginViaTelegram(ctx context.Context, user domain.TelegramUser, dbUser *domain.User) (string, string, error)
	GetOrCreate(ctx context.Context, userDomain domain.User) (*domain.User, error)
	RefreshToken(ctx context.Context, token string) (string, string, error)
	GetUserByID(ctx context.Context, userID string) (*domain.User, error)
	ByTelegramID(ctx context.Context, telegramID int) (*domain.User, error)
	GetAllUsers(ctx context.Context) ([]*domain.User, error)
}

type service struct {
	db            users.Repository
	log           *zap.Logger
	telegram      *telegram.Manager
	tokenManager  *auth.Manager
	tokenLifetime domain.TokenLifetime
	redisStorage  redisStorage.Storage
}

func NewService(
	db users.Repository,
	redisStorage redisStorage.Storage,
	tokenManager *auth.Manager,
	telegram *telegram.Manager,
	tokenLifetime domain.TokenLifetime,
	log *zap.Logger,
) Service {
	return &service{
		db:            db,
		redisStorage:  redisStorage,
		tokenManager:  tokenManager,
		telegram:      telegram,
		tokenLifetime: tokenLifetime,
		log:           log,
	}
}

func (service *service) LoginViaTelegram(ctx context.Context, telegramUser domain.TelegramUser, dbUser *domain.User) (string, string, error) {
	isTelegramAuth := service.telegram.CheckTelegramAuthorization(map[string]string{
		"id":         fmt.Sprintf("%d", telegramUser.ID),
		"first_name": fmt.Sprintf("%s", telegramUser.FirstName),
		"last_name":  fmt.Sprintf("%s", telegramUser.LastName),
		"username":   fmt.Sprintf("%s", telegramUser.Username),
		"photo_url":  fmt.Sprintf("%s", telegramUser.PhotoUrl),
		"auth_date":  fmt.Sprintf("%d", telegramUser.AuthDate),
		"hash":       fmt.Sprintf("%s", telegramUser.Hash),
	})
	if !isTelegramAuth {
		return "", "", errors.New("not is auth")
	}

	return service.GenerateTokens(ctx, dbUser, service.tokenLifetime.Access, service.tokenLifetime.Refresh)
}

func (service *service) GetOrCreate(ctx context.Context, userDomain domain.User) (*domain.User, error) {
	dbUser, err := service.db.ByTelegramID(ctx, userDomain.TelegramID)

	if err != nil {
		var errCreate error

		if errors.Is(err, apperror.ErrNotFound) {
			// Создаём пользователя
			dbUser, errCreate = service.db.Create(ctx, userDomain)

			if errCreate != nil {
				service.log.Error("error create user in database", zap.Error(errCreate))
				return nil, errCreate
			}
		}

		service.log.Error("error check exception", zap.Error(err))
		return nil, err
	}

	return dbUser, nil
}

func (service *service) GenerateTokens(ctx context.Context, user *domain.User, accessTime, refreshTime time.Duration) (string, string, error) {
	// Создаём access токен
	token, err := service.tokenManager.NewJWT(user.ID, user.Role, accessTime)
	if err != nil {
		service.log.Error("error generate new access token", zap.Error(err))
		return "", "", err
	}

	// Создаём refresh токен
	var refreshToken string
	refreshToken, err = service.tokenManager.NewRefreshToken()
	if err != nil {
		service.log.Error("error generate new refresh token", zap.Error(err))
		return "", "", err
	}

	// Записываем refresh токен в Redis и устанавливаем срок, которое данный токен будет находится в Redis
	err = service.redisStorage.WriteRefreshToken(ctx, refreshToken, user.ID, refreshTime)
	if err != nil {
		service.log.Error("error write refresh token to redis", zap.Error(err))
		return "", "", err
	}

	return token, refreshToken, nil
}

func (service *service) RefreshToken(ctx context.Context, token string) (string, string, error) {
	userID, err := service.redisStorage.GetUserIDByRefreshToken(ctx, token)
	if err != nil {
		return "", "", err
	}

	var user *domain.User
	user, err = service.db.ByID(ctx, userID)
	if err != nil {
		return "", "", err
	}

	var newAccessToken string
	newAccessToken, err = service.tokenManager.NewJWT(user.ID, user.Role, 15*time.Minute)
	if err != nil {
		return "", "", err
	}

	newRefreshToken, err := service.tokenManager.NewRefreshToken()
	if err != nil {
		return "", "", err
	}

	err = service.redisStorage.WriteRefreshToken(ctx, newRefreshToken, user.ID, 15*time.Minute)
	if err != nil {
		return "", "", err
	}

	return newAccessToken, newRefreshToken, nil
}

func (service *service) GetUserByID(ctx context.Context, userID string) (*domain.User, error) {
	user, err := service.db.ByID(ctx, userID)

	if err != nil {
		return user, err
	}

	return user, nil
}

func (service *service) ByTelegramID(ctx context.Context, telegramID int) (*domain.User, error) {
	user, err := service.db.ByTelegramID(ctx, telegramID)
	if err != nil {
		service.log.Error("get user by telegram id", zap.Error(err))
		return nil, err
	}

	return user, nil
}

func (service *service) GetAllUsers(ctx context.Context) ([]*domain.User, error) {
	all, err := service.db.All(ctx)
	if err != nil {
		service.log.Error("get all users", zap.Error(err))
		return nil, err
	}

	return all, nil
}

package users

import (
	"benches/internal/domain"
	"benches/internal/repository/postgres/users"
	redisStorage "benches/internal/storage/redis"
	"benches/pkg/auth"
	"benches/pkg/telegram"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"go.uber.org/zap"
	"time"
)

type Service interface {
	LoginViaTelegram(ctx context.Context, user domain.TelegramUser) (string, string, error)
	RefreshToken(ctx context.Context, token string) (string, string, error)
	GetUserByID(ctx context.Context, userID string) (*domain.User, error)
	ByTelegramID(ctx context.Context, telegramID int) (*domain.User, error)
}

type service struct {
	db           users.Repository
	log          *zap.Logger
	telegram     *telegram.Manager
	tokenManager *auth.Manager
	redisStorage redisStorage.Storage
}

func NewService(db users.Repository, redisStorage redisStorage.Storage, tokenManager *auth.Manager, telegram *telegram.Manager, log *zap.Logger) Service {
	return &service{db: db, redisStorage: redisStorage, tokenManager: tokenManager, telegram: telegram, log: log}
}

func (service *service) LoginViaTelegram(ctx context.Context, telegramUser domain.TelegramUser) (string, string, error) {
	user := domain.User{
		Username:   telegramUser.Username,
		TelegramID: telegramUser.ID,
	}

	dbUser, err := service.db.ByTelegramID(ctx, telegramUser.ID)
	if err == sql.ErrNoRows {
		var errCreate error
		errCreate = service.db.Create(ctx, user)
		if errCreate != nil {
			return "", "", errCreate
		}
	} else {
		if err != nil {
			return "", "", err
		}
	}

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

	var token string
	token, err = service.tokenManager.NewJWT(dbUser.ID, dbUser.Role, 60*time.Minute)
	if err != nil {
		return "", "", err
	}

	var refreshToken string
	refreshToken, err = service.tokenManager.NewRefreshToken()
	if err != nil {
		return "", "", err
	}

	err = service.redisStorage.WriteRefreshToken(ctx, refreshToken, dbUser.ID, 60*time.Minute)
	if err != nil {
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

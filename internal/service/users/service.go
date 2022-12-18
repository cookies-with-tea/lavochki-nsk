package users

import (
	"benches/internal/domain"
	"benches/internal/dto"
	"benches/internal/repository/postgres"
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
	LoginViaTelegram(ctx context.Context, dto dto.CreateUser) (string, string, error)
	RefreshToken(ctx context.Context, token string) (string, string, error)
	GetUserByID(ctx context.Context, userID string) (domain.User, error)
}

type service struct {
	db           postgres.UsersRepository
	log          *zap.Logger
	telegram     *telegram.Manager
	tokenManager *auth.Manager
	redisStorage redisStorage.Storage
}

func NewService(db postgres.UsersRepository, redisStorage redisStorage.Storage, tokenManager *auth.Manager, telegram *telegram.Manager, log *zap.Logger) Service {
	return &service{db: db, redisStorage: redisStorage, tokenManager: tokenManager, telegram: telegram, log: log}
}

func (service *service) LoginViaTelegram(ctx context.Context, dto dto.CreateUser) (string, string, error) {
	user := domain.User{
		Username:   dto.Username,
		TelegramID: dto.ID,
	}
	dbUser, err := service.db.GetUserByTelegramID(ctx, dto.ID)
	if err == sql.ErrNoRows {
		var errCreate error
		dbUser, errCreate = service.db.CreateUser(ctx, user)
		if errCreate != nil {
			return "", "", errCreate
		}
	} else {
		if err != nil {
			return "", "", err
		}
	}
	isTelegramAuth := service.telegram.CheckTelegramAuthorization(map[string]string{
		"id":         fmt.Sprintf("%d", dto.ID),
		"first_name": fmt.Sprintf("%s", dto.FirstName),
		"last_name":  fmt.Sprintf("%s", dto.LastName),
		"username":   fmt.Sprintf("%s", dto.Username),
		"photo_url":  fmt.Sprintf("%s", dto.PhotoUrl),
		"auth_date":  fmt.Sprintf("%d", dto.AuthDate),
		"hash":       fmt.Sprintf("%s", dto.Hash),
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

	var user domain.User
	user, err = service.db.GetUserByID(ctx, userID)
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

func (service *service) GetUserByID(ctx context.Context, userID string) (domain.User, error) {
	user, err := service.db.GetUserByID(ctx, userID)

	if err != nil {
		return user, err
	}

	return user, nil
}

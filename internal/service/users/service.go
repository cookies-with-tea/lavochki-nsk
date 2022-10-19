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

func (s *service) LoginViaTelegram(ctx context.Context, dto dto.CreateUser) (string, string, error) {
	user := domain.User{
		Username:   dto.Username,
		TelegramID: dto.ID,
	}
	dbUser, err := s.db.GetUserByTelegramID(ctx, dto.ID)
	if err == sql.ErrNoRows {
		var errCreate error
		dbUser, errCreate = s.db.CreateUser(ctx, user)
		if errCreate != nil {
			return "", "", errCreate
		}
	} else {
		if err != nil {
			return "", "", err
		}
	}
	isTelegramAuth := s.telegram.CheckTelegramAuthorization(map[string]string{
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
	token, err = s.tokenManager.NewJWT(dbUser.ID, dbUser.Role, 15*time.Minute)
	if err != nil {
		return "", "", err
	}
	var refreshToken string
	refreshToken, err = s.tokenManager.NewRefreshToken()
	if err != nil {
		return "", "", err
	}
	err = s.redisStorage.WriteRefreshToken(ctx, refreshToken, dbUser.ID, 15*time.Minute)
	if err != nil {
		return "", "", err
	}
	return token, refreshToken, nil
}

func (s *service) RefreshToken(ctx context.Context, token string) (string, string, error) {
	userID, err := s.redisStorage.GetUserIDByRefreshToken(ctx, token)
	if err != nil {
		return "", "", err
	}

	var user domain.User
	user, err = s.db.GetUserByID(ctx, userID)
	if err != nil {
		return "", "", err
	}

	var newAccessToken string
	newAccessToken, err = s.tokenManager.NewJWT(user.ID, user.Role, 15*time.Minute)
	if err != nil {
		return "", "", err
	}

	newRefreshToken, err := s.tokenManager.NewRefreshToken()
	if err != nil {
		return "", "", err
	}

	err = s.redisStorage.WriteRefreshToken(ctx, newRefreshToken, user.ID, 15*time.Minute)
	if err != nil {
		return "", "", err
	}

	return newAccessToken, newRefreshToken, nil
}

package users

import (
	"benches/internal/domain"
	"benches/internal/dto"
	"benches/pkg/auth"
	"benches/pkg/telegram"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"go.uber.org/zap"
	"time"
)

type Service struct {
	db           Database
	log          *zap.Logger
	telegram     *telegram.Manager
	tokenManager *auth.Manager
}

func NewService(db Database, tokenManager *auth.Manager, telegram *telegram.Manager, log *zap.Logger) *Service {
	return &Service{db: db, tokenManager: tokenManager, telegram: telegram, log: log}
}

func (s *Service) LoginViaTelegram(ctx context.Context, dto dto.CreateUser) (string, error) {
	user := domain.User{
		Username:   dto.Username,
		TelegramID: dto.ID,
	}
	dbUser, err := s.db.GetUserByTelegramID(ctx, dto.ID)
	if err == sql.ErrNoRows {
		var errCreate error
		dbUser, errCreate = s.db.CreateUser(ctx, user)
		if errCreate != nil {
			return "", errCreate
		}
	} else {
		if err != nil {
			return "", err
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
		return "", errors.New("not is auth")
	}
	var token string
	token, err = s.tokenManager.NewJWT(dbUser.ID, 48*time.Hour)
	if err != nil {
		return "", err
	}
	return token, nil
}

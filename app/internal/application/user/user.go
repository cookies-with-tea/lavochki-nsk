package user

import (
	"benches/internal/application/apperror"
	"benches/internal/domain"
	"benches/pkg/auth"
	"benches/pkg/telegram"
	"context"
	"errors"
	"fmt"
	"log/slog"
)

type Service struct {
	logger           *slog.Logger
	repository       Repository
	cacheRepository  CacheRepository
	tokenManager     auth.TokenManager
	telegramManager  telegram.TelegramManager
	tokenInformation *domain.TokenInformation
}

func NewService(logger *slog.Logger, repository Repository, tokenManager auth.TokenManager) *Service {
	return &Service{
		logger:       logger,
		repository:   repository,
		tokenManager: tokenManager,
	}
}

func (service *Service) GetOrCreate(ctx context.Context, user *domain.User) (*domain.User, error) {
	oldUser, err := service.repository.ByTelegramID(ctx, user.TelegramID)
	if err != nil {
		if !errors.Is(err, apperror.ErrNotFound) {
			service.logger.Error("failed get user from database", "error", err)
			return nil, err
		}

		user.Role = string(domain.UserRole)
		newUser, err := service.repository.Create(ctx, user)
		if err != nil {
			service.logger.Error("failed create user", "user", user, "error", err)
			return nil, err
		}

		return newUser, nil
	}

	return oldUser, nil
}

func (service *Service) GenerateTokens(
	ctx context.Context,
	user *domain.User,
	tokenInformation *domain.TokenInformation,
) (*domain.TokenCredentials, error) {
	accessToken, err := service.tokenManager.NewJWT(user.ID, user.Role, tokenInformation.AccessTime)
	if err != nil {
		service.logger.Info("failed generate new access token", slog.Any("error", err))
		return nil, err
	}

	refreshToken, err := service.tokenManager.NewRefreshToken()
	if err != nil {
		service.logger.Info("failed generate new refresh token", slog.Any("error", err))
		return nil, err
	}

	err = service.cacheRepository.CreateRefreshToken(ctx, user.ID, refreshToken, tokenInformation.RefreshTime)
	if err != nil {
		service.logger.Info(
			"failed create credentials token in cache",
			slog.Any("error", err),
		)
		return nil, err
	}

	return &domain.TokenCredentials{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (service *Service) LoginTelegram(
	ctx context.Context,
	telegramUser *domain.TelegramUser,
	user *domain.User,
) (*domain.TokenCredentials, error) {
	isTelegramAuth := service.telegramManager.CheckTelegramAuthorization(map[string]string{
		"id":         fmt.Sprintf("%d", telegramUser.ID),
		"first_name": telegramUser.FirstName,
		"last_name":  telegramUser.LastName,
		"username":   telegramUser.Username,
		"photo_url":  telegramUser.PhotoUrl,
		"auth_date":  fmt.Sprintf("%d", telegramUser.AuthDate),
		"hash":       telegramUser.Hash,
	})

	if !isTelegramAuth {
		return nil, apperror.ErrFailedAuthorization
	}

	return service.GenerateTokens(ctx, user, service.tokenInformation)
}

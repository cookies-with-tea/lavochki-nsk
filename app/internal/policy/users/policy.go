package users

import (
	"context"
	"errors"

	"benches/internal/apperror"
	"benches/internal/constants/roles"
	"benches/internal/domain"
	"benches/internal/service/users"
)

type Policy struct {
	usersService users.Service
}

func NewPolicy(usersService users.Service) *Policy {
	return &Policy{usersService: usersService}
}

func (policy *Policy) LoginViaTelegram(ctx context.Context, user domain.TelegramUser) (string, string, error) {
	dbUser, errCreateUser := policy.usersService.GetOrCreate(ctx, domain.User{TelegramID: user.ID, Username: user.Username})
	if errCreateUser != nil {
		return "", "", errCreateUser
	}

	return policy.usersService.LoginViaTelegram(ctx, user, dbUser)
}

func (policy *Policy) LoginViaTelegramByAdmin(ctx context.Context, telegramUser domain.TelegramUser) (string, string, error) {
	user, errGetByTelegramID := policy.usersService.ByTelegramID(ctx, telegramUser.ID)

	if errors.As(errGetByTelegramID, &apperror.ErrNotFound) || user.Role != roles.Admin {
		return "", "", apperror.ErrNotEnoughRights
	}

	if errGetByTelegramID != nil {
		return "", "", errGetByTelegramID
	}

	return policy.usersService.LoginViaTelegram(ctx, telegramUser, user)
}

func (policy *Policy) RefreshToken(ctx context.Context, token string) (string, string, error) {
	return policy.usersService.RefreshToken(ctx, token)
}

func (policy *Policy) GetUserByID(ctx context.Context, userID string) (*domain.User, error) {
	return policy.usersService.GetUserByID(ctx, userID)
}

func (policy *Policy) ByTelegramID(ctx context.Context, telegramID int) (*domain.User, error) {
	return policy.usersService.ByTelegramID(ctx, telegramID)
}

func (policy *Policy) GetAllUsers(ctx context.Context) ([]*domain.User, error) {
	return policy.usersService.GetAllUsers(ctx)
}

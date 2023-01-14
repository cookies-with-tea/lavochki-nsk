package users

import (
	"benches/internal/domain"
	"benches/internal/service/users"
	"context"
)

type Policy struct {
	usersService users.Service
}

func NewPolicy(usersService users.Service) *Policy {
	return &Policy{usersService: usersService}
}

func (policy *Policy) LoginViaTelegram(ctx context.Context, user domain.TelegramUser) (string, string, error) {
	return policy.usersService.LoginViaTelegram(ctx, user)
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

package bot

import (
	"benches/internal/domain"
	botService "benches/internal/service/bot"
	"context"
)

type Policy struct {
	botService botService.Service
}

func NewPolicy(botService botService.Service) *Policy {
	return &Policy{botService: botService}
}

func (policy *Policy) AuthorizationBot(ctx context.Context, bot domain.Bot) (string, string, error) {
	return policy.botService.AuthorizationBot(ctx, bot)
}

func (policy *Policy) RefreshToken(ctx context.Context, token string) (string, string, error) {
	return policy.botService.RefreshToken(ctx, token)
}

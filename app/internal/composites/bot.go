package composites

import (
	"benches/internal/config"
	botPolicy "benches/internal/policy/bot"
	botService "benches/internal/service/bot"
	botPublic "benches/internal/transport/httpv1/public/bot"

	"go.uber.org/zap"
)

type BotComposite struct {
	Service       botService.Service
	Policy        *botPolicy.Policy
	PublicHandler *botPublic.Handler
}

func NewBotComposite(databases *DatabaseComposite, managers *ManagerComposite, config *config.Config, logger *zap.Logger) *BotComposite {
	service := botService.NewService(config.Telegram.Login, config.Telegram.Password, logger, managers.AuthManager, databases.Redis)
	policy := botPolicy.NewPolicy(service)
	handler := botPublic.NewHandler(policy)

	return &BotComposite{
		Service:       service,
		Policy:        policy,
		PublicHandler: handler,
	}
}

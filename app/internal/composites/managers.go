package composites

import (
	"benches/pkg/auth"
	"benches/pkg/telegram"
)

type ManagerComposite struct {
	AuthManager     *auth.Manager
	TelegramManager *telegram.Manager
}

func NewManagerComposite(secretToken, telegramToken string) (*ManagerComposite, error) {
	authManager, err := auth.NewManager(secretToken)
	if err != nil {
		return nil, err
	}

	telegramManager := telegram.NewTelegramManager(telegramToken)

	return &ManagerComposite{
		AuthManager:     authManager,
		TelegramManager: telegramManager,
	}, nil
}

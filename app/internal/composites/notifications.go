package composites

import (
	"benches/internal/config"
	notificationsService "benches/internal/service/notifications"

	"go.uber.org/zap"
)

type NotificationComposite struct {
	Service notificationsService.Service
}

func NewNotificationComposite(config *config.Config, logger *zap.Logger) *NotificationComposite {
	var service notificationsService.Service
	if config.IsDevelopment {
		service = notificationsService.NewServiceMock(logger, config.Telegram.NotificationToken)
	} else {
		service = notificationsService.NewService(logger, config.Telegram.NotificationToken)
	}

	return &NotificationComposite{Service: service}
}

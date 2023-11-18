package notifications

import (
	"context"

	"benches/internal/domain"
	notificationsService "benches/internal/service/notifications"
)

type Policy struct {
	notificationsService notificationsService.Service
}

func NewPolicy(notificationsService notificationsService.Service) *Policy {
	return &Policy{notificationsService: notificationsService}
}

func (policy *Policy) SendNotificationInTelegram(ctx context.Context, notification *domain.TelegramNotification) error {
	return policy.notificationsService.SendNotificationInTelegram(ctx, notification)
}

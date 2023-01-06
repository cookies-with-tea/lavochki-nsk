package notifications

import (
	"benches/internal/notifications"
	notificationsService "benches/internal/service/notifications"
	"context"
)

type Policy struct {
	notificationsService notificationsService.Service
}

func NewPolicy(notificationsService notificationsService.Service) *Policy {
	return &Policy{notificationsService: notificationsService}
}

func (policy *Policy) SendNotificationInTelegram(ctx context.Context, notification *notifications.TelegramNotification) error {
	return policy.notificationsService.SendNotificationInTelegram(ctx, notification)
}

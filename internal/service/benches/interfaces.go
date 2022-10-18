package benches

import (
	"benches/internal/domain"
	"context"
)

type Database interface {
	GetBenches(ctx context.Context, isActive bool) ([]domain.Bench, error)
	CreateBench(ctx context.Context, bench domain.Bench) error
	UpdateActiveBench(ctx context.Context, id string, decision bool) error
	DeleteBench(ctx context.Context, id string) error
	GetBenchByID(ctx context.Context, id string) (domain.Bench, error)
}

type NotificationService interface {
	SendNotificationInTelegram(ctx context.Context, decision string, id int, id2 string)
}

package user

import (
	"benches/internal/application/apperror"
	"context"
	"time"

	"github.com/redis/go-redis/v9"
)

type Repository struct {
	client *redis.Client
}

func (repository *Repository) CreateRefreshToken(
	ctx context.Context,
	refreshToken string,
	userID string,
	duration time.Duration,
) error {
	err := repository.client.Set(ctx, refreshToken, userID, duration).Err()
	if err != nil {
		return err
	}

	return nil
}

func (repository *Repository) UserIDByRefreshToken(ctx context.Context, refreshToken string) (string, error) {
	userID, err := repository.client.Get(ctx, refreshToken).Result()

	if err == redis.Nil {
		return "", apperror.ErrNotFound
	}

	if err != nil {
		return "", err
	}

	return userID, nil
}

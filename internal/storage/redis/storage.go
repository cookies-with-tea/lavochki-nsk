package redis

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/go-redis/redis/v9"
)

type Storage interface {
	WriteRefreshToken(ctx context.Context, refreshToken string, userID string, duration time.Duration) error
	GetUserIDByRefreshToken(ctx context.Context, refreshToken string) (string, error)
}

type storage struct {
	client *redis.Client
}

func NewRedisStorage(client *redis.Client) Storage {
	return &storage{
		client: client,
	}
}

func (s *storage) WriteRefreshToken(ctx context.Context, refreshToken string, userID string, duration time.Duration) error {
	err := s.client.Set(ctx, refreshToken, userID, duration).Err()
	if err != nil {
		return err
	}
	if err != nil {
		return err
	}
	return nil
}

func (s *storage) GetUserIDByRefreshToken(ctx context.Context, refreshToken string) (string, error) {
	refreshToken, err := s.client.Get(ctx, refreshToken).Result()
	if err == redis.Nil {
		return "", errors.New(fmt.Sprintf("%s does not exists", refreshToken))
	} else if err != nil {
		return "", err
	}
	return refreshToken, nil
}

package image

import (
	"context"
	"fmt"
	"log/slog"

	"github.com/google/uuid"
)

type Service struct {
	logger     *slog.Logger
	repository Repository
}

func NewService(logger *slog.Logger, repository Repository) *Service {
	return &Service{
		logger:     logger,
		repository: repository,
	}
}

func (service *Service) CreateImages(ctx context.Context, images [][]byte) ([]string, error) {
	names := make([]string, 0, len(images))

	for _, image := range images {
		name, err := service.CreateImage(ctx, image)
		if err != nil {
			slog.Error("failed upload images", slog.Any("error", err))
			return nil, err
		}

		names = append(names, name)
	}

	return names, nil
}

func (service *Service) CreateImage(ctx context.Context, image []byte) (string, error) {
	name := fmt.Sprintf("%s.jpg", uuid.New().String())

	err := service.repository.UploadImage(ctx, name, image)
	if err != nil {
		service.logger.Error(
			"failed upload image",
			slog.Any("error", err),
			slog.String("name image", name),
		)
		return "", err
	}

	return name, nil
}

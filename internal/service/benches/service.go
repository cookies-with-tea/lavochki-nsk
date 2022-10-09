package benches

import (
	"benches/internal/domain"
	"benches/internal/dto"
	storage "benches/internal/storage/minio"
	"context"
	"fmt"
	"github.com/oklog/ulid/v2"
	"go.uber.org/zap"
)

type Service struct {
	db      Database
	log     *zap.Logger
	storage *storage.Storage
}

func NewService(db Database, storage *storage.Storage, log *zap.Logger) *Service {
	return &Service{db: db, storage: storage, log: log}
}

func (s *Service) GetListBenches(ctx context.Context, isActive bool) ([]domain.Bench, error) {
	users, err := s.db.GetBenches(ctx, isActive)
	if err != nil {
		s.log.Error("error get all benches", zap.Error(err))
		return nil, err
	}
	for idx := range users {
		users[idx].Image = s.storage.GetImageURL(users[idx].Image)
	}
	return users, nil
}

func (s *Service) CreateBench(ctx context.Context, dto dto.CreateBench) error {
	imageName := fmt.Sprintf("%s%s", ulid.Make(), ".jpg")
	err := s.storage.CreateImageFromBytes(ctx, imageName, dto.Image)
	if err != nil {
		return err
	}
	model := domain.Bench{Lng: dto.Lng, Lat: dto.Lat, Image: imageName}
	err = s.db.CreateBench(ctx, model)
	if err != nil {
		return err
	}
	return nil
}

func (s *Service) DecisionBench(ctx context.Context, dto dto.DecisionBench) error {
	var err error
	if dto.Decision {
		err = s.db.UpdateActiveBench(ctx, dto.ID, dto.Decision)
	} else {
		err = s.db.DeleteBench(ctx, dto.ID)
	}
	if err != nil {
		return err
	}
	return nil
}

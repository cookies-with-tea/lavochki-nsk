package benches

import (
	"benches/internal/domain"
	"benches/internal/dto"
	"bytes"
	"context"
	"fmt"
	"github.com/oklog/ulid/v2"
	"go.uber.org/zap"
	"io"
	"os"
)

type Service struct {
	db  Database
	log *zap.Logger
}

func NewService(db Database, log *zap.Logger) *Service {
	return &Service{db: db, log: log}
}

func (s *Service) GetListBenches(ctx context.Context) ([]domain.Bench, error) {
	users, err := s.db.GetBenches(ctx)
	if err != nil {
		s.log.Error("error get all benches", zap.Error(err))
		return nil, err
	}
	return users, nil
}

func (s *Service) CreateBench(ctx context.Context, dto dto.CreateBench) error {
	photoUUID := ulid.Make()
	imagePath := fmt.Sprintf("media/photo_%s.jpg", photoUUID)
	err := SaveImage(imagePath, dto.Image)
	if err != nil {
		return err
	}
	model := domain.Bench{Lng: dto.Lng, Lat: dto.Lat, Image: imagePath}
	err = s.db.CreateBench(ctx, model)
	if err != nil {
		return err
	}
	return nil
}

func SaveImage(path string, imgByte []byte) error {
	out, _ := os.Create(path)
	defer out.Close()

	_, err := io.Copy(out, bytes.NewReader(imgByte))
	if err != nil {
		return err
	}
	return nil
}

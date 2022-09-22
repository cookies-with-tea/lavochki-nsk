package benches

import (
	"benches/internal/domain"
	"context"
	"go.uber.org/zap"
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

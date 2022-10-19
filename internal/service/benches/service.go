package benches

import (
	"benches/internal/domain"
	"benches/internal/dto"
	"benches/internal/repository/postgres"
	"benches/internal/service/notifications"
	storage "benches/internal/storage/minio"
	"context"
	"fmt"
	"github.com/oklog/ulid/v2"
	"go.uber.org/zap"
)

type Service interface {
	GetListBenches(ctx context.Context, isActive bool) ([]domain.Bench, error)
	CreateBench(ctx context.Context, bench dto.CreateBench) error
	CreateBenchViaTelegram(ctx context.Context, bench dto.CreateBenchViaTelegram) error
	DecisionBench(ctx context.Context, decisionBench dto.DecisionBench) error
}

type service struct {
	db                   postgres.BenchesRepository
	log                  *zap.Logger
	storage              *storage.Storage
	notificationsService notifications.Service
	usersRepository      postgres.UsersRepository
}

func NewService(db postgres.BenchesRepository, storage *storage.Storage, log *zap.Logger,
	notificationsService notifications.Service, usersRepository postgres.UsersRepository) Service {
	return &service{db: db, storage: storage, log: log, notificationsService: notificationsService,
		usersRepository: usersRepository}
}

func (s *service) GetListBenches(ctx context.Context, isActive bool) ([]domain.Bench, error) {
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

func (s *service) CreateBench(ctx context.Context, bench dto.CreateBench) error {
	panic("implement me")
}

func (s *service) CreateBenchViaTelegram(ctx context.Context, dto dto.CreateBenchViaTelegram) error {
	imageName := fmt.Sprintf("%s%s", ulid.Make(), ".jpg")
	err := s.storage.CreateImageFromBytes(ctx, imageName, dto.Image)
	if err != nil {
		return err
	}
	user, err := s.usersRepository.GetUserByTelegramID(ctx, dto.UserTelegramID)
	if err != nil {
		return err
	}
	model := domain.Bench{Lng: dto.Lng, Lat: dto.Lat, Image: imageName, Owner: &user}
	err = s.db.CreateBench(ctx, model)
	if err != nil {
		return err
	}
	return nil
}

func (s *service) DecisionBench(ctx context.Context, dto dto.DecisionBench) error {
	var err error
	var typeDecision string

	var bench domain.Bench
	bench, err = s.db.GetBenchByID(ctx, dto.ID)
	if err != nil {
		return err
	}
	if dto.Decision {
		err = s.db.UpdateActiveBench(ctx, dto.ID, dto.Decision)
		typeDecision = "received"
	} else {
		err = s.db.DeleteBench(ctx, dto.ID)
		typeDecision = "denied"
	}
	if err != nil {
		return err
	}

	s.notificationsService.SendNotificationInTelegram(ctx, typeDecision, bench.Owner.TelegramID, bench.ID)
	return nil
}

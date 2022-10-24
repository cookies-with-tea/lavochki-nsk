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
	// Получаем все лавочки из базы данных
	benches, err := s.db.GetBenches(ctx, isActive)
	if err != nil {
		s.log.Error("error get all benches", zap.Error(err))
		return nil, err
	}
	// Получаем картинки из Minio
	for idx := range benches {
		for idxImage := range benches[idx].Images {
			benches[idx].Images[idxImage] = s.storage.GetImageURL(benches[idx].Images[idxImage])
		}
	}
	return benches, nil
}

func (s *service) CreateBench(ctx context.Context, bench dto.CreateBench) error {
	panic("implement me")
}

func (s *service) CreateBenchViaTelegram(ctx context.Context, dto dto.CreateBenchViaTelegram) error {
	var imagesName []string

	// Генерируем ULID и сохраняем каждую картинку в Minio
	for image := range dto.Images {
		imageName := fmt.Sprintf("%s%s", ulid.Make(), ".jpg")
		err := s.storage.CreateImageFromBytes(ctx, imageName, dto.Images[image])
		if err != nil {
			return err
		}
		imagesName = append(imagesName, imageName)
	}
	user, err := s.usersRepository.GetUserByTelegramID(ctx, dto.UserTelegramID)
	if err != nil {
		return err
	}
	model := domain.Bench{Lng: dto.Lng, Lat: dto.Lat, Images: imagesName, Owner: &user}
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

	err = s.notificationsService.SendNotificationInTelegram(ctx, typeDecision, bench.Owner.TelegramID, bench.ID)
	if err != nil {
		return err
	}
	return nil
}

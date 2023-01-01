package benches

import (
	"benches/internal/apperror"
	"benches/internal/domain"
	"benches/internal/dto"
	"benches/internal/notifications"
	"benches/internal/repository/model"
	"benches/internal/repository/postgres"
	notificationService "benches/internal/service/notifications"
	storage "benches/internal/storage/minio"
	"benches/pkg/api/sort"
	"context"
	"fmt"
	"github.com/oklog/ulid/v2"
	"go.uber.org/zap"
)

type Service interface {
	GetListBenches(ctx context.Context, isActive bool, sortOptions sort.Options) ([]domain.Bench, error)
	CreateBench(ctx context.Context, bench dto.CreateBench) error
	CreateBenchViaTelegram(ctx context.Context, bench dto.CreateBenchViaTelegram) error
	DecisionBench(ctx context.Context, decisionBench dto.DecisionBench) error
	GetBenchByID(ctx context.Context, id string) (domain.Bench, error)
}

type service struct {
	db                   postgres.BenchesRepository
	log                  *zap.Logger
	storage              *storage.Storage
	notificationsService notificationService.Service
	usersRepository      postgres.UsersRepository
}

func NewService(db postgres.BenchesRepository, storage *storage.Storage, log *zap.Logger,
	notificationsService notificationService.Service, usersRepository postgres.UsersRepository) Service {
	return &service{db: db, storage: storage, log: log, notificationsService: notificationsService,
		usersRepository: usersRepository}
}

func (service *service) GetListBenches(ctx context.Context, isActive bool, sortOptions sort.Options) ([]domain.Bench, error) {
	// Создаём параметры для сортировки
	options := model.NewSortOptions(sortOptions.Field, sortOptions.Order)

	// Получаем все лавочки из базы данных
	benches, err := service.db.All(ctx, isActive, options)
	if err != nil {
		service.log.Error("error get all benches", zap.Error(err))
		return nil, err
	}

	// Получаем картинки из Minio
	for idx := range benches {
		for idxImage := range benches[idx].Images {
			benches[idx].Images[idxImage] = service.storage.GetImageURL(benches[idx].Images[idxImage])
		}
	}

	return benches, nil
}

func (service *service) CreateBench(ctx context.Context, bench dto.CreateBench) error {
	panic("implement me")
}

func (service *service) CreateBenchViaTelegram(ctx context.Context, dto dto.CreateBenchViaTelegram) error {
	var imagesName []string

	user, err := service.usersRepository.ByTelegramID(ctx, dto.UserTelegramID)
	if err != nil {
		return apperror.ErrNotEnoughRights
	}

	// Генерируем ULID и сохраняем каждую картинку в Minio
	for image := range dto.Images {
		imageName := fmt.Sprintf("%s%s", ulid.Make(), ".jpg")
		err := service.storage.CreateImageFromBytes(ctx, imageName, dto.Images[image])
		if err != nil {
			return err
		}
		imagesName = append(imagesName, imageName)
	}

	model := domain.Bench{Lng: dto.Lng, Lat: dto.Lat, Images: imagesName, Owner: &user}
	err = service.db.Create(ctx, model)
	if err != nil {
		return apperror.ErrFailedToCreate
	}
	return nil
}

func (service *service) DecisionBench(ctx context.Context, dto dto.DecisionBench) error {
	var err error
	var notification *notifications.TelegramNotification

	var bench domain.Bench
	bench, err = service.db.ByID(ctx, dto.ID)
	if err != nil {
		return err
	}
	if dto.Decision {
		err = service.db.Update(ctx, dto.ID, dto.Decision)
		notification = notifications.BenchSuccessfullyAccepted.ToNotification(bench.Owner.TelegramID, bench.ID)
	} else {
		err = service.db.Delete(ctx, dto.ID)
		notification = notifications.BenchDenied.ToNotification(bench.Owner.TelegramID, bench.ID)
	}
	if err != nil {
		return err
	}

	err = service.notificationsService.SendNotificationInTelegram(ctx, notification)
	if err != nil {
		return err
	}
	return nil
}

func (service *service) GetBenchByID(ctx context.Context, id string) (domain.Bench, error) {
	// Получаем лавочку по ID из базы данных
	bench, err := service.db.ByID(ctx, id)
	if err != nil {
		return bench, err
	}

	// Получаем картинки для этой лавочки из Minio
	for idxImage := range bench.Images {
		bench.Images[idxImage] = service.storage.GetImageURL(bench.Images[idxImage])
	}
	return bench, nil
}

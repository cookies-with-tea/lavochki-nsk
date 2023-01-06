package benches

import (
	"benches/internal/apperror"
	"benches/internal/domain"
	"benches/internal/repository/model"
	"benches/internal/repository/postgres/benches"
	storage "benches/internal/storage/minio"
	"benches/pkg/api/sort"
	"context"
	"fmt"
	"github.com/oklog/ulid/v2"
	"go.uber.org/zap"
)

type Service interface {
	GetListBenches(ctx context.Context, isActive bool, sortOptions sort.Options) ([]*domain.Bench, error)
	CreateBench(ctx context.Context, bench domain.Bench) error
	DecisionBench(ctx context.Context, benchID string, decision bool) error
	GetBenchByID(ctx context.Context, id string) (*domain.Bench, error)
	SaveImages(ctx context.Context, images [][]byte) ([]string, error)
}

type service struct {
	db      benches.Repository
	log     *zap.Logger
	storage *storage.Storage
}

func NewService(db benches.Repository, storage *storage.Storage, log *zap.Logger) Service {
	return &service{db: db, storage: storage, log: log}
}

func (service *service) GetListBenches(ctx context.Context, isActive bool, sortOptions sort.Options) ([]*domain.Bench, error) {
	// Создаём параметры для сортировки
	options := model.NewSortOptions(sortOptions.Field, sortOptions.Order)

	// Получаем все лавочки из базы данных
	all, err := service.db.All(ctx, isActive, options)
	if err != nil {
		service.log.Error("error get all benches", zap.Error(err))
		return nil, err
	}

	// Получаем картинки из Minio
	for idx := range all {
		for idxImage := range all[idx].Images {
			all[idx].Images[idxImage] = service.storage.GetImageURL(all[idx].Images[idxImage])
		}
	}

	return all, nil
}

func (service *service) CreateBench(ctx context.Context, bench domain.Bench) error {
	err := service.db.Create(ctx, bench)
	if err != nil {
		service.log.Error("failed create bench", zap.Error(err))
		return apperror.ErrFailedToCreate
	}
	return nil
}

func (service *service) DecisionBench(ctx context.Context, benchID string, decision bool) error {
	var errChangeBench error

	// Делаем лавочку активной, либо удаляем её из БД
	if decision {
		errChangeBench = service.db.Update(ctx, benchID, domain.Bench{IsActive: true})
	} else {
		errChangeBench = service.db.Delete(ctx, benchID)
	}

	if errChangeBench != nil {
		return errChangeBench
	}

	return nil
}

func (service *service) GetBenchByID(ctx context.Context, id string) (*domain.Bench, error) {
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

func (service *service) SaveImages(ctx context.Context, images [][]byte) ([]string, error) {
	var imagesName []string

	// Генерируем ULID и сохраняем каждую картинку в Minio
	for image := range images {
		imageName := fmt.Sprintf("%s%s", ulid.Make(), ".jpg")
		err := service.storage.CreateImageFromBytes(ctx, imageName, images[image])
		if err != nil {
			return []string{}, nil
		}
		imagesName = append(imagesName, imageName)
	}
	return imagesName, nil
}

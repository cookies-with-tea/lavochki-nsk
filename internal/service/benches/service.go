package benches

import (
	"benches/internal/apperror"
	"benches/internal/domain"
	"benches/internal/repository/model"
	"benches/internal/repository/postgres/benches"
	storage "benches/internal/storage/minio"
	"benches/pkg/api/paginate"
	"benches/pkg/api/sort"
	"context"
	"errors"
	"fmt"
	"github.com/jackc/pgx/v5"
	"github.com/oklog/ulid/v2"
	"go.uber.org/zap"
)

type Service interface {
	GetListBenches(ctx context.Context, isActive bool, sortOptions *sort.Options,
		paginateOptions *paginate.Options) ([]*domain.Bench, error)
	CreateBench(ctx context.Context, bench domain.Bench) error
	DecisionBench(ctx context.Context, benchID string, decision bool) error
	GetBenchByID(ctx context.Context, id string) (*domain.Bench, error)
	SaveImages(ctx context.Context, images [][]byte) ([]string, error)
	UpdateBench(ctx context.Context, id string, bench domain.Bench) error
	DeleteBench(ctx context.Context, id string) error
	CountAllBenches(ctx context.Context, isActive bool) (int, error)
}

type service struct {
	db      benches.Repository
	log     *zap.Logger
	storage *storage.Storage
}

func NewService(db benches.Repository, storage *storage.Storage, log *zap.Logger) Service {
	return &service{db: db, storage: storage, log: log}
}

func (service *service) GetListBenches(ctx context.Context, isActive bool, sortOptions *sort.Options,
	paginateOptions *paginate.Options) ([]*domain.Bench, error) {

	var optionsForSort model.SortOptions
	var optionsForPaginate model.PaginateOptions

	// Создаём параметры для сортировки
	if sortOptions != nil {
		optionsForSort = model.NewSortOptions(sortOptions.Field, sortOptions.Order)
	}

	// Создаём параметры для пагинации
	if paginateOptions != nil {
		optionsForPaginate = model.NewPaginateOptions(paginateOptions.Page, paginateOptions.PerPage)
	}

	// Получаем все лавочки из базы данных
	all, err := service.db.All(ctx, isActive, optionsForSort, optionsForPaginate)
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

func (service *service) CountAllBenches(ctx context.Context, isActive bool) (int, error) {
	count, err := service.db.Count(ctx, isActive)
	if err != nil {
		service.log.Error("get count all benches", zap.Error(err))
		return 0, err
	}

	return count, nil
}

func (service *service) CreateBench(ctx context.Context, bench domain.Bench) error {
	err := service.db.Create(ctx, bench)
	if err != nil {
		service.log.Error("failed create bench", zap.Error(err))
		return apperror.ErrFailedToCreate
	}
	return nil
}

func (service *service) UpdateBench(ctx context.Context, id string, bench domain.Bench) error {
	err := service.db.Update(ctx, id, bench)
	if err != nil {
		service.log.Error("failed update bench", zap.String("id", id), zap.Error(err))
		return apperror.ErrFailedToUpdate
	}

	return nil
}

func (service *service) DeleteBench(ctx context.Context, id string) error {
	err := service.db.Delete(ctx, id)
	if err != nil {
		service.log.Error("failed delete bench", zap.String("id", id), zap.Error(err))
		return apperror.ErrFailedToDelete
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
		if errors.Is(err, pgx.ErrNoRows) {
			return bench, apperror.ErrNotFound
		}
		service.log.Error("get bench by id", zap.Error(err))
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

package benches

import (
	"context"

	"benches/internal/apperror"
	"benches/internal/constants/roles"
	"benches/internal/domain"
	benchesService "benches/internal/service/benches"
	notificationsService "benches/internal/service/notifications"
	tagsService "benches/internal/service/tags"
	usersService "benches/internal/service/users"
	"benches/pkg/api/paginate"
	"benches/pkg/api/search"
	"benches/pkg/api/sort"
	"benches/pkg/maps"

	"go.uber.org/zap"
)

type Policy struct {
	benchesService       benchesService.Service
	usersService         usersService.Service
	notificationsService notificationsService.Service
	tagsService          tagsService.Service
	geoCoder             maps.GeoCoder
	logger               *zap.Logger
}

func NewPolicy(benchesService benchesService.Service, usersService usersService.Service,
	notificationsService notificationsService.Service,
	tagsService tagsService.Service, geoCoder maps.GeoCoder, logger *zap.Logger) *Policy {
	return &Policy{
		benchesService:       benchesService,
		usersService:         usersService,
		notificationsService: notificationsService,
		tagsService:          tagsService,
		geoCoder:             geoCoder,
		logger:               logger,
	}
}

func (policy *Policy) CreateBenchViaTelegram(ctx context.Context, userTelegramID int,
	byteImages [][]byte, bench domain.Bench) error {
	// Получаем пользователя по Telegram ID
	user, err := policy.usersService.ByTelegramID(ctx, userTelegramID)
	if err != nil {
		return apperror.ErrNotEnoughRights
	}

	// Получаем адрес по координатам лавочки
	address, errReverseGeoCode := policy.geoCoder.ReverseGeocode(bench.Lat, bench.Lng)
	if errReverseGeoCode != nil {
		policy.logger.Error("error reverse geo code", zap.Error(errReverseGeoCode))
		return errReverseGeoCode
	}

	// Устанавливаем улицу
	if address.Street != "" {
		bench.Street = address.Street
	}

	// Сохраняем все фотографии, которые нам пришли в виде байт, в Minio
	images, err := policy.benchesService.SaveImages(ctx, byteImages)
	if err != nil {
		policy.logger.Error("error save image", zap.Error(err))
		return err
	}

	// Дополняем поля Bench
	bench.Images = images
	bench.Owner = user.ID

	// Создаём лавочку
	_, errCreateBench := policy.benchesService.CreateBench(ctx, bench)
	if errCreateBench != nil {
		policy.logger.Error("error create bench", zap.Error(errCreateBench))
		return errCreateBench
	}

	return nil
}

func (policy *Policy) GetListBenches(ctx context.Context, isActive bool, sortOptions *sort.Options,
	paginateOptions *paginate.Options, searchOptions *[]search.Option) (domain.BenchesList, error) {
	all, errGetList := policy.benchesService.GetListBenches(ctx, isActive, sortOptions, paginateOptions, searchOptions)
	if errGetList != nil {
		return domain.BenchesList{}, errGetList
	}

	count, errGetCount := policy.benchesService.CountAllBenches(ctx, isActive)
	if errGetCount != nil {
		return domain.BenchesList{}, errGetCount
	}

	countAllPages := 0
	if count != 0 {
		countAllPages = count / paginateOptions.PerPage
	}

	list := domain.NewBenchesList(all, count, len(all), countAllPages, paginateOptions.Page)

	return list, nil
}

func (policy *Policy) CreateBench(ctx context.Context, ownerID string, byteImages [][]byte,
	tags []string, bench domain.Bench) (*domain.Bench, error) {
	// Сохраняем все фотографии, которые нам пришли байтам, в Minio
	images, err := policy.benchesService.SaveImages(ctx, byteImages)
	if err != nil {
		return nil, err
	}

	// Получаем адрес по координатам лавочки
	address, errReverseGeoCode := policy.geoCoder.ReverseGeocode(bench.Lat, bench.Lng)
	if errReverseGeoCode != nil {
		policy.logger.Error("error reverse geo code", zap.Error(errReverseGeoCode))
		return nil, errReverseGeoCode
	}

	// Устанавливаем улицу
	if address != nil && address.Street != "" {
		bench.Street = address.Street
	}

	// Устанавливаем дополнительные переменные
	bench.Images = images
	bench.Owner = ownerID

	// Создаём лавочку
	newBench, errCreateBench := policy.benchesService.CreateBench(ctx, bench)
	if errCreateBench != nil {
		policy.logger.Error("error create bench", zap.Error(errCreateBench))
		return nil, errCreateBench
	}

	// Добавляем к лавочке теги, если они есть
	for _, tagID := range tags {
		errAddToBench := policy.tagsService.AddTagToBench(ctx, domain.TagBench{BenchID: newBench.ID, TagID: tagID})
		if errAddToBench != nil {
			policy.logger.Error("error add tag to bench", zap.Error(errAddToBench))
			return nil, errAddToBench
		}
	}

	return newBench, nil
}

func (policy *Policy) UpdateBench(ctx context.Context, id string, tags []string, bench domain.Bench, byteImages [][]byte) error {
	// Удаляем старые теги
	errDeleteTags := policy.tagsService.DeleteByBench(ctx, id)
	if errDeleteTags != nil {
		return errDeleteTags
	}

	// Добавляем новые
	for _, tag := range tags {
		errAddTag := policy.tagsService.AddTagToBench(ctx, domain.TagBench{
			TagID:   tag,
			BenchID: id,
		})

		if errAddTag != nil {
			return errAddTag
		}
	}

	// Сохраняем все фотографии, которые нам пришли в виде байт, в Minio
	_, err := policy.benchesService.SaveImages(ctx, byteImages)
	if err != nil {
		policy.logger.Error("error save image", zap.Error(err))
		return err
	}

	return policy.benchesService.UpdateBench(ctx, id, bench)
}

func (policy *Policy) DecisionBench(ctx context.Context, benchID string, decision bool, message string) error {
	// Получаем лавочку по ID, потому что нам нужен TelegramID создателя лавочки
	bench, errGetBench := policy.benchesService.GetBenchByID(ctx, benchID)
	if errGetBench != nil {
		return errGetBench
	}

	// Получаем пользователя по ID
	user, errGetUser := policy.usersService.GetUserByID(ctx, bench.Owner)
	if errGetUser != nil {
		return errGetUser
	}

	// Обновляем bench. Если decision = false, то лавочка удалится. Иначе будет обновлено поле is_active = true
	errDecisionBench := policy.benchesService.DecisionBench(ctx, benchID, decision)
	if errDecisionBench != nil {
		return errDecisionBench
	}

	// Выбираем тип уведомления
	var notification *domain.TelegramNotification
	if decision {
		notification, _ = domain.BenchSuccessfullyAccepted.ToNotification(user.TelegramID, bench.ID)
	} else {
		notification, _ = domain.BenchDenied.ToNotification(user.TelegramID, bench.ID)
	}

	// Отправляем уведомления в telegram
	errSendNotification := policy.notificationsService.SendNotificationInTelegram(ctx, notification)
	if errSendNotification != nil {
		return errSendNotification
	}

	return nil
}

func (policy *Policy) GetDetailBench(ctx context.Context, id string, userRole string) (*domain.Bench, error) {
	bench, err := policy.GetBenchByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if !bench.IsActive && userRole != roles.Admin {
		return nil, apperror.ErrNotFound
	}

	return bench, nil
}

func (policy *Policy) GetBenchByID(ctx context.Context, id string) (*domain.Bench, error) {
	return policy.benchesService.GetBenchByID(ctx, id)
}

func (policy *Policy) DeleteBench(ctx context.Context, id string) error {
	return policy.benchesService.DeleteBench(ctx, id)
}

func (policy *Policy) GetNearestBenches(ctx context.Context, benchID string) ([]*domain.Bench, error) {
	return policy.benchesService.GetNearestBenches(ctx, benchID)
}

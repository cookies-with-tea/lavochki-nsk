package benches

import (
	"benches/internal/apperror"
	"benches/internal/domain"
	"benches/internal/notifications"
	benchesService "benches/internal/service/benches"
	notificationsService "benches/internal/service/notifications"
	usersService "benches/internal/service/users"
	"benches/pkg/api/paginate"
	"benches/pkg/api/sort"
	"context"
)

type Policy struct {
	benchesService       benchesService.Service
	usersService         usersService.Service
	notificationsService notificationsService.Service
}

func NewPolicy(benchesService benchesService.Service, usersService usersService.Service, notificationsService notificationsService.Service) *Policy {
	return &Policy{benchesService: benchesService, usersService: usersService, notificationsService: notificationsService}
}

func (policy *Policy) CreateBenchViaTelegram(ctx context.Context, userTelegramID int, byteImages [][]byte, bench domain.Bench) error {
	// Получаем пользователя по Telegram ID
	user, err := policy.usersService.ByTelegramID(ctx, userTelegramID)
	if err != nil {
		return apperror.ErrNotEnoughRights
	}

	// Сохраняем все фотографии, которые нам пришли в виде байт, в Minio
	images, err := policy.benchesService.SaveImages(ctx, byteImages)
	if err != nil {
		return err
	}

	// Дополняем поля Bench
	bench.Images = images
	bench.Owner = user.ID

	// Создаём лавочку
	errCreateBench := policy.benchesService.CreateBench(ctx, bench)
	if errCreateBench != nil {
		return errCreateBench
	}

	return nil
}

func (policy *Policy) GetListBenches(ctx context.Context, isActive bool, sortOptions *sort.Options,
	paginateOptions *paginate.Options) (domain.BenchesList, error) {

	all, errGetList := policy.benchesService.GetListBenches(ctx, isActive, sortOptions, paginateOptions)
	if errGetList != nil {
		return domain.BenchesList{}, errGetList
	}

	count, errGetCount := policy.benchesService.CountAllBenches(ctx, isActive)
	if errGetCount != nil {
		return domain.BenchesList{}, errGetCount
	}

	list := domain.NewBenchesList(all, count)

	return list, nil
}

func (policy *Policy) CreateBench(ctx context.Context, bench domain.Bench) error {
	return policy.benchesService.CreateBench(ctx, bench)
}

func (policy *Policy) UpdateBench(ctx context.Context, id string, bench domain.Bench) error {
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
	var notification *notifications.TelegramNotification
	if decision {
		notification = notifications.BenchSuccessfullyAccepted.ToNotification(user.TelegramID, bench.ID)
	} else {
		notification = notifications.BenchDenied.ToNotification(user.TelegramID, bench.ID)
	}

	// Отправляем уведомления в telegram
	errSendNotification := policy.notificationsService.SendNotificationInTelegram(ctx, notification)
	if errSendNotification != nil {
		return errSendNotification
	}

	return nil
}

func (policy *Policy) GetBenchByID(ctx context.Context, id string) (*domain.Bench, error) {
	return policy.benchesService.GetBenchByID(ctx, id)
}

func (policy *Policy) DeleteBench(ctx context.Context, id string) error {
	return policy.benchesService.DeleteBench(ctx, id)
}

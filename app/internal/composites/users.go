package composites

import (
	"benches/internal/config"
	"benches/internal/domain"
	usersPolicy "benches/internal/policy/users"
	usersRepository "benches/internal/repository/postgres/users"
	redisStorage "benches/internal/repository/redis"
	usersService "benches/internal/service/users"
	usersPrivate "benches/internal/transport/httpv1/private/users"
	usersPublic "benches/internal/transport/httpv1/public/users"

	"go.uber.org/zap"
)

type UserComposite struct {
	Repository     usersRepository.Repository
	RedisStorage   redisStorage.Storage
	Service        usersService.Service
	Policy         *usersPolicy.Policy
	PrivateHandler *usersPrivate.Handler
	PublicHandler  *usersPublic.Handler
}

func NewUserComposite(
	databases *DatabaseComposite,
	managers *ManagerComposite,
	config *config.Config,
	logger *zap.Logger,
) *UserComposite {
	repository := usersRepository.NewUsersRepository(databases.PostgreSQL)

	service := usersService.NewService(
		repository,
		databases.Redis,
		managers.AuthManager,
		managers.TelegramManager,
		domain.CreateTokenLifetime(
			config.AppConfig.LifetimeAccessTokenMinutes,
			config.AppConfig.LifetimeRefreshTokenMinutes,
		),
		logger,
	)

	policy := usersPolicy.NewPolicy(service)

	handlerPublic := usersPublic.NewHandler(policy)
	handlerPrivate := usersPrivate.NewHandler(policy)

	return &UserComposite{
		Repository:     repository,
		Service:        service,
		Policy:         policy,
		PrivateHandler: handlerPrivate,
		PublicHandler:  handlerPublic,
	}
}

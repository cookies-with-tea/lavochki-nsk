package postgres

import (
	"benches/internal/domain"
	"context"
	"github.com/oklog/ulid/v2"
	"github.com/uptrace/bun"
)

type UsersRepository interface {
	ByTelegramID(ctx context.Context, telegramID int) (domain.User, error)
	Create(ctx context.Context, user domain.User) (domain.User, error)
	ByID(ctx context.Context, id string) (domain.User, error)
}

type usersRepository struct {
	db *bun.DB
}

func NewUsersRepository(db *bun.DB) UsersRepository {
	return &usersRepository{
		db: db,
	}
}

func (u *usersRepository) ByTelegramID(ctx context.Context, telegramID int) (domain.User, error) {
	model := userModel{}
	err := u.db.NewSelect().Model(&model).Where("telegram_id = ?", telegramID).Scan(ctx)
	if err != nil {
		return domain.User{}, err
	}
	return userModelToDomain(model), nil
}

func (u *usersRepository) Create(ctx context.Context, user domain.User) (domain.User, error) {
	model := userModel{}
	model.FromDomain(user)
	model.ID = ulid.Make().String()
	_, err := u.db.NewInsert().Model(&model).Exec(ctx)
	if err != nil {
		return domain.User{}, err
	}
	return userModelToDomain(model), nil
}

func (u *usersRepository) ByID(ctx context.Context, id string) (domain.User, error) {
	model := userModel{}
	err := u.db.NewSelect().Model(&model).Where("id = ?", id).Scan(ctx)
	if err != nil {
		return domain.User{}, err
	}
	return userModelToDomain(model), nil
}

package postgres

import (
	"benches/internal/domain"
	"context"
	"github.com/oklog/ulid/v2"
	"github.com/uptrace/bun"
)

type UsersRepository struct {
	db *bun.DB
}

func NewUsersRepository(db *bun.DB) *UsersRepository {
	return &UsersRepository{
		db: db,
	}
}

func (u *UsersRepository) GetUserByTelegramID(ctx context.Context, telegramID int) (domain.User, error) {
	model := userModel{}
	err := u.db.NewSelect().Model(&model).Where("telegram_id = ?", telegramID).Scan(ctx)
	if err != nil {
		return domain.User{}, err
	}
	return userModelToDomain(model), nil
}

func (u *UsersRepository) CreateUser(ctx context.Context, user domain.User) (domain.User, error) {
	model := userModel{}
	model.FromDomain(user)
	model.ID = ulid.Make().String()
	_, err := u.db.NewInsert().Model(&model).Exec(ctx)
	if err != nil {
		return domain.User{}, err
	}
	return userModelToDomain(model), nil
}

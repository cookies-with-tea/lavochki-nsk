package postgres

import (
	"benches/internal/domain"
	"github.com/uptrace/bun"
)

type userModel struct {
	bun.BaseModel `bun:"table:users,alias:users,select:users"`

	ID         string `bun:"id,pk"`
	Username   string `bun:"username"`
	TelegramID int    `bun:"telegram_id"`
	Role       string `bun:"role"`
}

func (u *userModel) FromDomain(user domain.User) {
	u.ID = user.ID
	u.Username = user.Username
	u.TelegramID = user.TelegramID
	u.Role = user.Role
}

func userModelToDomain(model userModel) domain.User {
	return domain.User{
		ID:         model.ID,
		Username:   model.Username,
		TelegramID: model.TelegramID,
		Role:       model.Role,
	}
}

func userModelsToDomain(models []userModel) []domain.User {
	users := make([]domain.User, 0, len(models))
	for _, model := range models {
		users = append(users, userModelToDomain(model))
	}
	return users
}

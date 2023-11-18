package users

import (
	"benches/internal/domain"
)

type userModel struct {
	ID         string `mapstructure:"id,omitempty"`
	Username   string `mapstructure:"username,omitempty"`
	TelegramID int    `mapstructure:"telegram_id,omitempty"`
	Role       string `mapstructure:"role,omitempty"`
}

func (user *userModel) FromDomain(userDomain domain.User) {
	user.ID = userDomain.ID
	user.Username = userDomain.Username
	user.TelegramID = userDomain.TelegramID
	user.Role = userDomain.Role
}

func (user *userModel) ToMap() map[string]interface{} {
	userMap := make(map[string]interface{})

	userMap["id"] = user.ID
	userMap["username"] = user.Username
	userMap["telegram_id"] = user.TelegramID
	userMap["role"] = user.Role

	return userMap
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

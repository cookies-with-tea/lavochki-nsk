package users

import (
	"benches/internal/domain"

	"github.com/mitchellh/mapstructure"
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

func (user *userModel) ToMap() (map[string]interface{}, error) {
	var updateUserMap map[string]interface{}
	err := mapstructure.Decode(user, &updateUserMap)
	if err != nil {
		return updateUserMap, err
	}

	return updateUserMap, nil
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

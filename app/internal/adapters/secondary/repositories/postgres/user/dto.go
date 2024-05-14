package user

import "benches/internal/domain"

type model struct {
	ID         string
	Username   string
	TelegramID int
	Role       string
}

func (user *model) FromDomain(userDomain domain.User) {
	user.ID = userDomain.ID
	user.Username = userDomain.Username
	user.TelegramID = userDomain.TelegramID
	user.Role = userDomain.Role
}

func (user *model) ToMap() map[string]any {
	return map[string]any{
		"id":          user.ID,
		"role":        user.Role,
		"telegram_id": user.TelegramID,
		"username":    user.Username,
	}
}

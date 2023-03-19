package dto

import (
	"benches/internal/domain"

	validation "github.com/go-ozzo/ozzo-validation"
)

type CreateUser struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Username  string `json:"username"`
	PhotoUrl  string `json:"photo_url"`
	AuthDate  int    `json:"auth_date"`
	Hash      string `json:"hash"`
}

type AuthorizationBot struct {
	Login    string
	Password string
}

func (user *CreateUser) Validate() error {
	return validation.ValidateStruct(user,
		validation.Field(&user.ID, validation.Required),
		validation.Field(&user.FirstName, validation.Required),
		validation.Field(&user.LastName),
		validation.Field(&user.Username),
		validation.Field(&user.PhotoUrl, validation.Required),
		validation.Field(&user.AuthDate, validation.Required),
		validation.Field(&user.Hash, validation.Required))
}

func (user *CreateUser) ToDomain() domain.TelegramUser {
	return domain.TelegramUser{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Username:  user.Username,
		PhotoUrl:  user.PhotoUrl,
		AuthDate:  user.AuthDate,
		Hash:      user.Hash,
	}
}

func (bot *AuthorizationBot) Validate() error {
	return validation.ValidateStruct(bot,
		validation.Field(&bot.Login, validation.Required),
		validation.Field(&bot.Password, validation.Required),
	)
}

func (bot *AuthorizationBot) ToDomain() domain.Bot {
	return domain.Bot{
		Login:    bot.Login,
		Password: bot.Password,
	}
}

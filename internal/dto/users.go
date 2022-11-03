package dto

import validation "github.com/go-ozzo/ozzo-validation"

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

func (u *CreateUser) Validate() error {
	return validation.ValidateStruct(u,
		validation.Field(&u.ID, validation.Required),
		validation.Field(&u.FirstName, validation.Required),
		validation.Field(&u.LastName),
		validation.Field(&u.Username),
		validation.Field(&u.PhotoUrl, validation.Required),
		validation.Field(&u.AuthDate, validation.Required),
		validation.Field(&u.Hash, validation.Required))
}

func (u *AuthorizationBot) Validate() error {
	return validation.ValidateStruct(u,
		validation.Field(&u.Login, validation.Required),
		validation.Field(&u.Password, validation.Required),
	)
}

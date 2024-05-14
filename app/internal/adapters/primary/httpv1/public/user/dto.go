package user

import (
	"benches/internal/domain"

	validation "github.com/go-ozzo/ozzo-validation"
)

type CreateUserInput struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Username  string `json:"username"`
	PhotoUrl  string `json:"photo_url"`
	AuthDate  int    `json:"auth_date"`
	Hash      string `json:"hash"`
}

type UserOutput struct {
	ID         string `json:"id"`
	Username   string `json:"username"`
	TelegramID int    `json:"telegram_id"`
	Role       string `json:"role"`
}

type CredentialsOutput struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

func (dto *CredentialsOutput) FromDomain(credentials *domain.TokenCredentials) {
	dto.AccessToken = credentials.AccessToken
	dto.RefreshToken = credentials.RefreshToken
}

func (dto *UserOutput) FromDomain(user *domain.User) {
	dto.ID = user.ID
	dto.Username = user.Username
	dto.TelegramID = user.TelegramID
	dto.Role = user.Role
}

func (dto *CreateUserInput) Validate() error {
	return validation.ValidateStruct(
		dto,
		validation.Field(&dto.ID, validation.Required),
		validation.Field(&dto.FirstName, validation.Required),
		validation.Field(&dto.LastName, validation.Required),
		validation.Field(&dto.Username, validation.Required),
		validation.Field(&dto.PhotoUrl, validation.Required),
		validation.Field(&dto.AuthDate, validation.Required),
		validation.Field(&dto.Hash, validation.Required),
	)
}

func (dto *CreateUserInput) ToDomain() *domain.TelegramUser {
	return &domain.TelegramUser{
		ID:        dto.ID,
		FirstName: dto.FirstName,
		LastName:  dto.LastName,
		Username:  dto.Username,
		PhotoUrl:  dto.PhotoUrl,
		AuthDate:  dto.AuthDate,
		Hash:      dto.Hash,
	}
}

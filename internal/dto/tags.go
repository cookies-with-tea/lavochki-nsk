package dto

import (
	"benches/internal/domain"

	validation "github.com/go-ozzo/ozzo-validation"
)

type CreateTag struct {
	Title string `json:"title"`
}

func (tag *CreateTag) Validate() error {
	return validation.ValidateStruct(tag,
		validation.Field(&tag.Title, validation.Required))
}

func (tag *CreateTag) ToDomain() domain.Tag {
	return domain.Tag{
		Title: tag.Title,
	}
}

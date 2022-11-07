package dto

import validation "github.com/go-ozzo/ozzo-validation"

type CreateTag struct {
	Title string `json:"title"`
}

func (tag *CreateTag) Validate() error {
	return validation.ValidateStruct(tag,
		validation.Field(&tag.Title, validation.Required))
}

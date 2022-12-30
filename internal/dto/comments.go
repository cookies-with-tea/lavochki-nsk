package dto

import (
	"benches/internal/domain"
	validation "github.com/go-ozzo/ozzo-validation"
)

type CreateComment struct {
	BenchID  string `json:"bench_id"`
	ParentID string `json:"parent_id"`
	Content  string `json:"content"`
}

type UpdateComment struct {
	ID      string `json:"id"`
	Content string `json:"content"`
}

func (comment *CreateComment) Validate() error {
	return validation.ValidateStruct(comment,
		validation.Field(&comment.BenchID, validation.Required),
		validation.Field(&comment.Content, validation.Required))
}

func (comment *CreateComment) ToDomain() domain.Comment {
	return domain.Comment{
		BenchID:  comment.BenchID,
		ParentID: comment.ParentID,
		Content:  comment.Content,
	}
}

func (comment *UpdateComment) Validate() error {
	return validation.ValidateStruct(comment,
		validation.Field(&comment.ID, validation.Required))
}

func (comment *UpdateComment) ToDomain() domain.Comment {
	return domain.Comment{
		ID:      comment.ID,
		Content: comment.Content,
	}
}

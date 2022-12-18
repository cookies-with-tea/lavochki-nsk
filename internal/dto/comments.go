package dto

import (
	"benches/internal/domain"
	validation "github.com/go-ozzo/ozzo-validation"
)

type CreateComment struct {
	BenchID  string `json:"bench_id"`
	ParentID string `json:"parent_id"`
	AuthorID string `json:"author_id"`
	Content  string `json:"content"`
}

func (comment *CreateComment) Validate() error {
	return validation.ValidateStruct(comment,
		validation.Field(&comment.BenchID, validation.Required),
		validation.Field(&comment.AuthorID, validation.Required),
		validation.Field(&comment.Content, validation.Required))
}

func (comment *CreateComment) ToDomain() domain.Comment {
	return domain.Comment{
		BenchID:  comment.BenchID,
		ParentID: comment.ParentID,
		AuthorID: comment.AuthorID,
		Content:  comment.Content,
	}
}

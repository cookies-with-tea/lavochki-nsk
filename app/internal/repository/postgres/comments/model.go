package comments

import (
	"benches/internal/domain"
)

type commentModel struct {
	ID       string `mapstructure:"id,omitempty"`
	BenchID  string `mapstructure:"bench_id,omitempty"`
	ParentID string `mapstructure:"parent_id,omitempty"`
	AuthorID string `mapstructure:"author_id,omitempty"`
	Content  string `mapstructure:"content,omitempty"`
}

func (comment *commentModel) FromDomain(commentDomain domain.Comment) {
	comment.ID = commentDomain.ID
	comment.BenchID = commentDomain.BenchID
	comment.ParentID = commentDomain.ParentID
	comment.AuthorID = commentDomain.AuthorID
	comment.Content = commentDomain.Content
}

func commentModelToDomain(model commentModel) domain.Comment {
	return domain.Comment{
		ID:       model.ID,
		BenchID:  model.BenchID,
		ParentID: model.ParentID,
		AuthorID: model.AuthorID,
		Content:  model.Content,
	}
}

func (comment *commentModel) ToMap() map[string]interface{} {
	commentMap := make(map[string]interface{})

	commentMap["id"] = comment.ID
	commentMap["bench_id"] = comment.BenchID
	commentMap["parent_id"] = comment.ParentID
	commentMap["author_id"] = comment.AuthorID
	commentMap["content"] = comment.Content

	return commentMap
}

func commentModelsToDomain(models []commentModel) []domain.Comment {
	comments := make([]domain.Comment, 0, len(models))
	for _, model := range models {
		comments = append(comments, commentModelToDomain(model))
	}
	return comments
}

package comments

import (
	"benches/internal/domain"
	"github.com/mitchellh/mapstructure"
)

type commentModel struct {
	ID       string
	BenchID  string
	ParentID string
	AuthorID string
	Content  string
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

func (comment *commentModel) ToMap() (map[string]interface{}, error) {
	var updateCommentMap map[string]interface{}
	err := mapstructure.Decode(comment, &updateCommentMap)
	if err != nil {
		return updateCommentMap, err
	}

	return updateCommentMap, nil
}

func commentModelsToDomain(models []commentModel) []domain.Comment {
	comments := make([]domain.Comment, 0, len(models))
	for _, model := range models {
		comments = append(comments, commentModelToDomain(model))
	}
	return comments
}

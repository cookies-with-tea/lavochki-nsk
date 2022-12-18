package postgres

import (
	"benches/internal/domain"
	"github.com/uptrace/bun"
)

type commentModel struct {
	bun.BaseModel `bun:"table:comments,alias:comments,select:comments"`

	ID       string      `bun:"id,pk"`
	BenchID  string      `bun:"bench_id"`
	Bench    *benchModel `bun:"rel:belongs-to,join:bench_id=id"`
	ParentID string      `bun:"parent_id"`
	AuthorID string      `bun:"author_id"`
	Author   *userModel  `bun:"rel:belongs-to,join:author_id=id"`
	Content  string      `bun:"content"`
}

func (commentModel *commentModel) FromDomain(comment domain.Comment) {
	commentModel.ID = comment.ID
	commentModel.BenchID = comment.BenchID
	commentModel.ParentID = comment.ParentID
	commentModel.AuthorID = comment.AuthorID
	commentModel.Content = comment.Content
}

func commentModelToDomain(model commentModel) domain.Comment {
	return domain.Comment{
		ID:       model.ID,
		BenchID:  model.BenchID,
		ParentID: model.ParentID,
		Content:  model.Content,
	}
}

func commentModelsToDomain(models []commentModel) []domain.Comment {
	comments := make([]domain.Comment, 0, len(models))
	for _, model := range models {
		comments = append(comments, commentModelToDomain(model))
	}
	return comments
}

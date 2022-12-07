package postgres

import (
	"benches/internal/domain"
	"context"
	"github.com/uptrace/bun"
)

type CommentsRepository interface {
	GetByBenchID(ctx context.Context, id string) ([]domain.Comment, error)
	GetByParentID(ctx context.Context, id string) ([]domain.Comment, error)
}

type commentsRepository struct {
	db *bun.DB
}

func NewCommentsRepository(db *bun.DB) CommentsRepository {
	return &commentsRepository{db: db}
}

// GetByBenchID Получение всех комментариев по ID лавочки
func (repository *commentsRepository) GetByBenchID(ctx context.Context, id string) ([]domain.Comment, error) {
	commentsModel := make([]commentModel, 0)
	err := repository.db.NewSelect().Model(&commentsModel).Where("bench_id = ? AND parent_id is ?", id, nil).Scan(ctx)
	if err != nil {
		return nil, err
	}
	comments := commentModelsToDomain(commentsModel)
	return comments, nil
}

// GetByParentID Получение всех комментариев по ID родители
func (repository *commentsRepository) GetByParentID(ctx context.Context, id string) ([]domain.Comment, error) {
	commentsModel := make([]commentModel, 0)
	err := repository.db.NewSelect().Model(&commentsModel).Where("parent_id = ?", id).Scan(ctx)
	if err != nil {
		return nil, err
	}
	comments := commentModelsToDomain(commentsModel)
	return comments, nil
}

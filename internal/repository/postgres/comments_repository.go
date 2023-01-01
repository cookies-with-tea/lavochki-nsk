package postgres

import (
	"benches/internal/domain"
	"context"
	"github.com/oklog/ulid/v2"
	"github.com/uptrace/bun"
)

type CommentsRepository interface {
	ByBenchID(ctx context.Context, id string) ([]domain.Comment, error)
	ByParentID(ctx context.Context, id string) ([]domain.Comment, error)
	Create(ctx context.Context, bench domain.Comment) error
	Update(ctx context.Context, comment domain.Comment) error
	ByID(ctx context.Context, id string) (domain.Comment, error)
}

type commentsRepository struct {
	db *bun.DB
}

func NewCommentsRepository(db *bun.DB) CommentsRepository {
	return &commentsRepository{db: db}
}

// ByBenchID Получение всех комментариев по ID лавочки
func (repository *commentsRepository) ByBenchID(ctx context.Context, id string) ([]domain.Comment, error) {
	commentsModel := make([]commentModel, 0)
	err := repository.db.NewSelect().Model(&commentsModel).Where("bench_id = ? AND parent_id is ?", id, nil).Scan(ctx)
	if err != nil {
		return nil, err
	}
	comments := commentModelsToDomain(commentsModel)
	return comments, nil
}

// ByParentID Получение всех комментариев по ID родители
func (repository *commentsRepository) ByParentID(ctx context.Context, id string) ([]domain.Comment, error) {
	commentsModel := make([]commentModel, 0)
	err := repository.db.NewSelect().Model(&commentsModel).Where("parent_id = ?", id).Scan(ctx)
	if err != nil {
		return nil, err
	}
	comments := commentModelsToDomain(commentsModel)
	return comments, nil
}

// ByID Получение комментария по ID
func (repository *commentsRepository) ByID(ctx context.Context, id string) (domain.Comment, error) {
	comment := commentModel{}
	err := repository.db.NewSelect().Model(&comment).Where("comments.id = ?", id).Scan(ctx)
	if err != nil {
		return domain.Comment{}, err
	}
	return commentModelToDomain(comment), nil
}

// Create Создание комментария
func (repository *commentsRepository) Create(ctx context.Context, comment domain.Comment) error {
	model := commentModel{}
	model.FromDomain(comment)
	model.ID = ulid.Make().String()
	_, err := repository.db.NewInsert().Model(&model).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}

// Update Обновление комментария
func (repository *commentsRepository) Update(ctx context.Context, comment domain.Comment) error {
	model := commentModel{}
	model.FromDomain(comment)

	_, err := repository.db.NewUpdate().
		Model(&model).
		OmitZero().
		WherePK().
		Exec(ctx)

	if err != nil {
		return err
	}

	return nil
}

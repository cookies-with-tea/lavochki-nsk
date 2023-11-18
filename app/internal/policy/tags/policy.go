package tags

import (
	"context"

	"benches/internal/domain"
	tagsService "benches/internal/service/tags"
)

type Policy struct {
	tagsService tagsService.Service
}

func NewPolicy(tagsService tagsService.Service) *Policy {
	return &Policy{tagsService: tagsService}
}

func (policy *Policy) GetAllTags(ctx context.Context) ([]*domain.Tag, error) {
	return policy.tagsService.GetAllTags(ctx)
}

func (policy *Policy) CreateTag(ctx context.Context, tag domain.Tag) error {
	return policy.tagsService.CreateTag(ctx, tag)
}

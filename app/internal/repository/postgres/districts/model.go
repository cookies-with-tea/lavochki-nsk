package districts

import "benches/internal/domain"

type distinctModel struct {
	ID    int
	Title string
}

func (model *distinctModel) FromModel(distinct domain.District) {
	model.ID = distinct.ID
	model.Title = distinct.Title
}

func distinctModelsToDomain(models []distinctModel) []*domain.District {
	list := make([]*domain.District, 0, len(models))
	for _, model := range models {
		list = append(list, distinctModelToDomain(model))
	}

	return list
}

func distinctModelToDomain(model distinctModel) *domain.District {
	return &domain.District{
		ID:    model.ID,
		Title: model.Title,
	}
}

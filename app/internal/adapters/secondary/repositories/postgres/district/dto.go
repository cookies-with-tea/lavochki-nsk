package district

import (
	"benches/internal/domain"
)

type model struct {
	ID    int
	Title string
}

func toDomain(dto *model) *domain.District {
	return &domain.District{
		ID:    dto.ID,
		Title: dto.Title,
	}
}

func toDomains(dto []*model) []*domain.District {
	list := make([]*domain.District, len(dto))

	for index, element := range dto {
		list[index] = toDomain(element)
	}

	return list
}

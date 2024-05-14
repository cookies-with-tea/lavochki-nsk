package bench

import (
	"benches/internal/adapters/primary/httpv1"
	"benches/internal/domain"
)

type BenchesListOutput struct {
	httpv1.Paginate
	Items []BenchOutput
}

type BenchOutput struct {
	ID       string  `json:"id"`
	Lat      float64 `json:"lat"`
	Lng      float64 `json:"lng"`
	Street   string  `json:"street"`
	District string  `json:"district"`
	IsActive bool    `json:"is_active"`
	OwnerID  string  `json:"owner_id"`
}

func (dto *BenchOutput) FromDomain(bench *domain.Bench) {
	dto.ID = bench.ID
	dto.Lat = bench.Lat
	dto.Lng = bench.Lng
	dto.Street = *bench.Street
	dto.IsActive = bench.IsActive
	dto.OwnerID = bench.OwnerID
}

func (dto *BenchesListOutput) FromDomain(benches []*domain.Bench, pages int, currentPage int) {
	list := make([]BenchOutput, len(benches))

	for _, bench := range benches {
		output := BenchOutput{}
		output.FromDomain(bench)

		list = append(list, output)
	}

	dto.Items = list
	dto.Count = len(benches)
	dto.CurrentPage = currentPage
	dto.Pages = pages
}

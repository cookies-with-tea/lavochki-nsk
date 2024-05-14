package bench

import (
	"benches/internal/domain"

	validation "github.com/go-ozzo/ozzo-validation"
)

type CreateBenchInput struct {
	Lat     float64  `json:"lat"`
	Lng     float64  `json:"lng"`
	Street  string   `json:"street,omitempty"`
	Images  []string `json:"images"`
	OwnerID string   `json:"-"`
}

type BenchOutput struct {
	ID       string   `json:"id"`
	Lat      float64  `json:"lat"`
	Lng      float64  `json:"lng"`
	Street   *string  `json:"street,omitempty"`
	Images   []string `json:"images"`
	IsActive bool     `json:"is_active"`
	OwnerID  string   `json:"owner_id"`
}

func (dto *CreateBenchInput) Validate() error {
	return validation.ValidateStruct(
		dto,
		validation.Field(&dto.Lat, validation.Required),
		validation.Field(&dto.Lng, validation.Required),
	)
}

func (dto *CreateBenchInput) ToDomain() *domain.Bench {
	return &domain.Bench{
		Lat:     dto.Lat,
		Lng:     dto.Lng,
		OwnerID: dto.OwnerID,
		Street:  &dto.Street,
		Images:  dto.Images,
	}
}

func (dto *BenchOutput) FromDomain(bench *domain.Bench) {
	dto.ID = bench.ID
	dto.Lat = bench.Lat
	dto.Lng = bench.Lng
	dto.OwnerID = bench.OwnerID
	dto.Street = bench.Street
	dto.IsActive = bench.IsActive
	dto.Images = bench.Images
}

package dto

import (
	"benches/internal/domain"
	"strconv"

	validation "github.com/go-ozzo/ozzo-validation"
)

type CreateBench struct {
	Lat    float64  `json:"lat,string"`
	Lng    float64  `json:"lng,string"`
	Images [][]byte `json:"images"`
	Tags   []string `json:"tags"`
}

type CreateBenchViaTelegram struct {
	Lat            float64  `json:"lat"`
	Lng            float64  `json:"lng"`
	Images         [][]byte `json:"images"`
	UserTelegramID int      `json:"user_telegram_id"`
}

type UpdateBench struct {
	Lat  float64  `json:"lat"`
	Lng  float64  `json:"lng"`
	Tags []string `json:"tags"`
}

type DecisionBench struct {
	ID       string `json:"id"`
	Decision bool   `json:"decision"`
	Message  string `json:"message"`
}

func (bench *CreateBench) Validate() error {
	return validation.ValidateStruct(bench,
		validation.Field(&bench.Lat, validation.Required),
		validation.Field(&bench.Lng, validation.Required),
		validation.Field(&bench.Images, validation.Required))
}

func (bench *CreateBench) ToDomain() domain.Bench {
	return domain.Bench{
		Lat: bench.Lat,
		Lng: bench.Lng,
	}
}

func (bench *UpdateBench) ToDomain() domain.Bench {
	return domain.Bench{
		Lat: bench.Lat,
		Lng: bench.Lng,
	}
}

func (bench *CreateBenchViaTelegram) Validate() error {
	return validation.ValidateStruct(bench,
		validation.Field(&bench.Lat, validation.Required),
		validation.Field(&bench.Lng, validation.Required),
		validation.Field(&bench.Images, validation.Required),
		validation.Field(&bench.UserTelegramID, validation.Required))
}

func (bench *CreateBenchViaTelegram) ToDomain() domain.Bench {
	return domain.Bench{
		Lat:   bench.Lat,
		Lng:   bench.Lng,
		Owner: strconv.Itoa(bench.UserTelegramID),
	}
}

func (bench *DecisionBench) Validate() error {
	return validation.ValidateStruct(bench,
		validation.Field(&bench.ID, validation.Required),
	)
}

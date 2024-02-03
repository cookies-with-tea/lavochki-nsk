package domain

import (
	"time"

	"github.com/oklog/ulid/v2"
)

type Bench struct {
	ID       string   `json:"id,pk"`
	Lat      float64  `json:"lat"`
	Lng      float64  `json:"lng"`
	Street   string   `json:"street"`
	Images   []string `json:"images"`
	IsActive bool     `json:"is_active"`
	Owner    string   `json:"owner"`

	Tags []*Tag `json:"tags"`
}

type BenchesList struct {
	Pagination Pagination `json:"pagination"`
	Items      []*Bench   `json:"items"`
}

func NewBenchesList(benches []*Bench, count, countInPage, countAllPages, currentPage int) BenchesList {
	return BenchesList{
		Items: benches,
		Pagination: Pagination{
			Count:         count,
			CountAllPages: countAllPages,
			PerPage:       countInPage,
			CurrentPage:   currentPage,
		},
	}
}

func (bench *Bench) CreatedAt() (*time.Time, error) {
	benchULID, err := ulid.Parse(bench.ID)
	if err != nil {
		return nil, err
	}

	createdAt := time.Unix(int64(benchULID.Time()), 0)
	return &createdAt, nil
}

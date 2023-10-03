package domain

type Bench struct {
	ID       string   `json:"id,pk"`
	Lat      float64  `json:"lat"`
	Lng      float64  `json:"lng"`
	Street   string   `json:"street"`
	Images   []string `json:"images"`
	IsActive bool     `json:"is_active"`
	Owner    string   `json:"owner"`
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

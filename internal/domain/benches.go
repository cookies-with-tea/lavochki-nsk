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
	Count         int      `json:"count"`
	CountInPage   int      `json:"count_in_page"`
	CountAllPages int      `json:"count_all_pages"`
	Items         []*Bench `json:"items"`
}

func NewBenchesList(benches []*Bench, count, countInPage, countAllPages int) BenchesList {
	return BenchesList{
		Count:         count,
		Items:         benches,
		CountInPage:   countInPage,
		CountAllPages: countAllPages,
	}
}

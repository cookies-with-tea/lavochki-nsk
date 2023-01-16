package domain

type Bench struct {
	ID       string   `json:"id,pk"`
	Lat      float64  `json:"lat"`
	Lng      float64  `json:"lng"`
	Images   []string `json:"images"`
	IsActive bool     `json:"is_active"`
	Owner    string   `json:"owner"`
}

type BenchesList struct {
	Count int      `json:"count"`
	Items []*Bench `json:"items"`
}

func NewBenchesList(benches []*Bench, count int) BenchesList {
	return BenchesList{
		Count: count,
		Items: benches,
	}
}

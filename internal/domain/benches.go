package domain

type Bench struct {
	ID       string   `json:"id,pk"`
	Lat      float64  `json:"lat"`
	Lng      float64  `json:"lng"`
	Images   []string `json:"images"`
	IsActive bool     `json:"is_active"`
	Owner    string   `json:"owner"`
}

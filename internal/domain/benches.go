package domain

type Bench struct {
	ID    string  `json:"id,pk"`
	Lat   float64 `json:"lat"`
	Lng   float64 `json:"lng"`
	Image string  `json:"image"`
}

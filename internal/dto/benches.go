package dto

type CreateBench struct {
	Lat   float64 `json:"lat"`
	Lng   float64 `json:"lng"`
	Image []byte  `json:"image"`
}

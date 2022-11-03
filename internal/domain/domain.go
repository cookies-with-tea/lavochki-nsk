package domain

type Location struct {
	Lat float64
	Lng float64
}

type CreateBench struct {
	Lat            float64  `json:"lat"`
	Lng            float64  `json:"lng"`
	Images         [][]byte `json:"images"`
	UserTelegramID int      `json:"user_telegram_id"`
}

type Tokens struct {
	Access  string `json:"access"`
	Refresh string `json:"refresh"`
}

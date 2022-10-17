package domain

type Location struct {
	Lat float64
	Lng float64
}

type CreateBench struct {
	Lat            float64 `json:"lat"`
	Lng            float64 `json:"lng"`
	Image          []byte  `json:"image"`
	UserTelegramID int     `json:"user_telegram_id"`
}

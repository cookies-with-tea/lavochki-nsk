package dto

type CreateBench struct {
	Lat   float64 `json:"lat"`
	Lng   float64 `json:"lng"`
	Image []byte  `json:"image"`
}

type CreateBenchViaTelegram struct {
	Lat            float64 `json:"lat"`
	Lng            float64 `json:"lng"`
	Image          []byte  `json:"image"`
	UserTelegramID int     `json:"user_telegram_id"`
}

type DecisionBench struct {
	ID       string `json:"id"`
	Decision bool   `json:"decision"`
}

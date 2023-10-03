package domain

type Pagination struct {
	Count         int `json:"count"`
	CountAllPages int `json:"count_all_pages"`
	PerPage       int `json:"per_page"`
	CurrentPage   int `json:"current_page"`
}

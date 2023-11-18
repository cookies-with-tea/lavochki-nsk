package domain

type Tag struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}

type TagBench struct {
	TagID   string `json:"tag_id,omitempty"`
	BenchID string `json:"bench_id,omitempty"`
}

package domain

type Comment struct {
	ID             string    `json:"id,pk"`
	BenchID        string    `json:"bench_id"`
	ParentID       string    `json:"parent_id"`
	Content        string    `json:"content"`
	NestedComments []Comment `json:"nested_comments"`
}

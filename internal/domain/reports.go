package domain

type CommentReport struct {
	ID        string `json:"id"`
	Cause     string `json:"cause"`
	CommentID string `json:"comment_id"`
	UserID    string `json:"user_id"`
	IsActive  bool   `json:"is_active"`
}

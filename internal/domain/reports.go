package domain

type CommentReport struct {
	ID        string `json:"ID"`
	Cause     string `json:"cause"`
	CommentID string `json:"commentID"`
	UserID    string `json:"userID"`
	IsActive  bool   `json:"is_active"`
}

package domain

type Bench struct {
	ID        string `json:"id,pk"`
	PositionX int    `json:"position_x"`
	PositionY int    `json:"position_y"`
}

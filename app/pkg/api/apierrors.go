package api

import "encoding/json"

type ErrorResponse struct {
	Message string
	Details json.RawMessage
}

type JSONMarshal interface {
	MarshalJSON() ([]byte, error)
	UnmarshalJSON(data []byte) error
}

func (e *ErrorResponse) Marshal() []byte {
	marshal, err := json.Marshal(e)
	if err != nil {
		return nil
	}
	return marshal
}

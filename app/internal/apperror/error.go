package apperror

import "encoding/json"

var (
	ErrNotFound           = NewAppError(nil, "not found", nil)
	ErrIncorrectDataAuth  = NewAppError(nil, "incorrect login details", nil)
	ErrIncorrectDataToken = NewAppError(nil, "incorrect token", nil)
	ErrDecodeData         = NewAppError(nil, "error decode data", nil)
	ErrNotEnoughRights    = NewAppError(nil, "not enough rights", nil)
	ErrFailedToCreate     = NewAppError(nil, "failed to create", nil)
	ErrObjectExists       = NewAppError(nil, "object exists", nil)
	ErrFailedToUpdate     = NewAppError(nil, "failed to update", nil)
	ErrFailedToDelete     = NewAppError(nil, "failed to delete", nil)
)

type JSONMarshal interface {
	MarshalJSON() ([]byte, error)
	UnmarshalJSON(data []byte) error
}

type AppError struct {
	Err     error           `json:"-"`
	Message string          `json:"message,omitempty"`
	Details json.RawMessage `json:"details"`
}

func (e *AppError) Error() string {
	return e.Message
}

func (e *AppError) Unwrap() error { return e.Err }

func (e *AppError) Marshal() []byte {
	marshal, err := json.Marshal(e)
	if err != nil {
		return nil
	}
	return marshal
}

func NewAppError(err error, message string, details json.RawMessage) *AppError {
	return &AppError{
		Err:     err,
		Message: message,
		Details: details,
	}
}

func systemError(err error) *AppError {
	return NewAppError(err, "internal system error", nil)
}

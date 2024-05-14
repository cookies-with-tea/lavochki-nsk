package apperror

import "errors"

var (
	ErrNotFound            = errors.New("error not found")
	ErrFailedAuthorization = errors.New("failed authorization")
)

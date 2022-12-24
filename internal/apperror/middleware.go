package apperror

import (
	"errors"
	"net/http"
)

type appHandler func(w http.ResponseWriter, r *http.Request) error

func Middleware(h appHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		var appErr *AppError
		err := h(w, r)
		if err != nil {
			if errors.As(err, &appErr) {
				if errors.Is(err, ErrNotFound) {
					w.WriteHeader(http.StatusNotFound)
					w.Write(ErrNotFound.Marshal())
					return
				}
				if errors.Is(err, ErrIncorrectDataAuth) {
					w.WriteHeader(http.StatusNotFound)
					w.Write(ErrIncorrectDataAuth.Marshal())
					return
				}
				if errors.Is(err, ErrIncorrectDataToken) {
					w.WriteHeader(http.StatusNotFound)
					w.Write(ErrIncorrectDataToken.Marshal())
					return
				}
				if errors.Is(err, ErrDecodeData) {
					w.WriteHeader(http.StatusNotFound)
					w.Write(ErrDecodeData.Marshal())
					return
				}
				if errors.Is(err, ErrNotEnoughRights) {
					w.WriteHeader(http.StatusForbidden)
					w.Write(ErrNotEnoughRights.Marshal())
					return
				}
				if errors.Is(err, ErrFailedToCreate) {
					w.WriteHeader(http.StatusNotFound)
					w.Write(ErrFailedToCreate.Marshal())
					return
				}
				if errors.Is(err, ErrObjectExists) {
					w.WriteHeader(http.StatusConflict)
					w.Write(ErrObjectExists.Marshal())
					return
				}
				err = err.(*AppError)
				w.WriteHeader(http.StatusBadRequest)
				w.Write(appErr.Marshal())
				return
			}

			w.WriteHeader(http.StatusTeapot)
			w.Write(systemError(err).Marshal())
		}
	}
}

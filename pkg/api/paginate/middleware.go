package paginate

import (
	"benches/pkg/api"
	"context"
	"net/http"
	"strconv"
)

const (
	OptionsContextKey = "paginate_options"
)

type Options struct {
	Page    int
	PerPage int
}

func Middleware(nextHandler http.HandlerFunc, defaultPage int, defaultPerPage int) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		pageInQuery := request.URL.Query().Get("page")
		perPageInQuery := request.URL.Query().Get("per_page")

		var page int
		if pageInQuery == "" {
			page = defaultPage
		} else {
			var err error
			page, err = strconv.Atoi(pageInQuery)
			if err != nil {
				errResponse := api.ErrorResponse{
					Message: "invalid page settings",
				}
				writer.WriteHeader(http.StatusBadRequest)
				writer.Write(errResponse.Marshal())
				return
			}
		}

		var perPage int
		if perPageInQuery == "" {
			perPage = defaultPerPage
		} else {
			var err error
			perPage, err = strconv.Atoi(perPageInQuery)
			if err != nil {
				errResponse := api.ErrorResponse{
					Message: "per_page value is too large",
				}
				writer.WriteHeader(http.StatusBadRequest)
				writer.Write(errResponse.Marshal())
				return
			}
		}

		options := Options{
			Page:    page,
			PerPage: perPage,
		}

		ctx := context.WithValue(request.Context(), OptionsContextKey, options)
		request = request.WithContext(ctx)

		nextHandler(writer, request)
	}
}

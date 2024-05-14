package paginate

import (
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

		page := defaultPage
		if pageInQuery != "" {
			var err error

			page, err = strconv.Atoi(pageInQuery)
			if err != nil {
				// errResponse := api.Response{
				// 	Errors: []string{"invalid page settings"},
				// }
				writer.WriteHeader(http.StatusBadRequest)
				// FIXME: У errResponse нет Marshal
				// writer.Write(errResponse.Marshal())
				return
			}
		}

		perPage := defaultPerPage
		if perPageInQuery != "" {
			var err error

			perPage, err = strconv.Atoi(perPageInQuery)
			if err != nil {
				// errResponse := api.Response{
				// 	Errors: []string{"per_page value is too large"},
				// }
				writer.WriteHeader(http.StatusBadRequest)
				// FIXME: У errResponse нет Marshal
				// writer.Write(errResponse.Marshal())
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

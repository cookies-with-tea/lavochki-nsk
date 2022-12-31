package sort

import (
	"benches/pkg/api"
	"context"
	"net/http"
	"strings"
)

const (
	ASC               = "ASC"
	DESC              = "DESC"
	OptionsContextKey = "sort_options"
)

type Options struct {
	Field string
	Order string
}

func Middleware(nextHandler http.HandlerFunc, defaultSortField, defaultSortOrder string) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		sortBy := request.URL.Query().Get("sort_by")
		sortOrder := request.URL.Query().Get("sort_order")

		if sortBy == "" {
			sortBy = defaultSortField
		}

		if sortOrder == "" {
			sortOrder = defaultSortOrder
		} else {
			upperSortOrder := strings.ToUpper(sortOrder)
			if upperSortOrder != ASC && upperSortOrder != DESC {
				writer.WriteHeader(http.StatusBadRequest)
				err := api.ErrorResponse{
					Message: "collation must be ASC or DESC",
					Details: nil,
				}
				writer.Write(err.Marshal())
				return
			}
		}

		options := Options{
			Field: sortBy,
			Order: sortOrder,
		}
		ctx := context.WithValue(request.Context(), OptionsContextKey, options)
		request = request.WithContext(ctx)

		nextHandler(writer, request)
	}
}

package search

import (
	"context"
	"encoding/json"
	"net/http"
	"net/url"
	"sort"
	"strings"

	"benches/pkg/api"
)

const (
	OptionsContextKey = "filters"
	EqOperator        = "__eq"
	GteOperator       = "__gte"
	LteOperator       = "__lte"
)

type Option struct {
	Field    string
	Value    string
	Operator string
}

func Middleware(nextHandler http.HandlerFunc, availableFilteringFields, ignoreFilteringFields []string) http.HandlerFunc {
	sort.Strings(availableFilteringFields)

	ignoreFilteringFields = append(ignoreFilteringFields, api.DefaultIgnoreFilteringFields...)
	sort.Strings(ignoreFilteringFields)

	return func(writer http.ResponseWriter, request *http.Request) {
		parameters, errParse := url.ParseQuery(request.URL.RawQuery)
		if errParse != nil {
			writer.WriteHeader(http.StatusBadRequest)
			err := api.ErrorResponse{
				Message: "query params parsing error",
				Details: nil,
			}
			writer.Write(err.Marshal())
		}

		filters := make([]Option, 0)
		for key, values := range parameters {
			if index := sort.SearchStrings(ignoreFilteringFields, key); index < len(ignoreFilteringFields) {
				continue
			}

			if index := sort.SearchStrings(availableFilteringFields, key); index >= len(availableFilteringFields) {
				writer.WriteHeader(http.StatusBadRequest)

				details, errMarshal := json.Marshal(map[string]any{
					"field": key,
				})
				if errMarshal != nil {
					err := api.ErrorResponse{
						Message: "internal system error",
						Details: nil,
					}
					writer.Write(err.Marshal())

					return
				}

				err := api.ErrorResponse{
					Message: "unknown fields to filter",
					Details: details,
				}
				writer.Write(err.Marshal())
				return
			}

			for _, value := range values {
				var operator string
				switch {
				case strings.HasSuffix(value, EqOperator):
					operator = "eq"
				case strings.HasSuffix(value, GteOperator):
					operator = "gte"
				case strings.HasSuffix(value, LteOperator):
					operator = "lte"
				default:
					operator = "eq"
				}

				filters = append(filters, Option{
					Field:    key,
					Value:    value,
					Operator: operator,
				})
			}
		}

		ctx := context.WithValue(request.Context(), OptionsContextKey, filters)
		request = request.WithContext(ctx)

		nextHandler(writer, request)
	}
}

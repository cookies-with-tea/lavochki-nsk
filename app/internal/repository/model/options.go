package model

import (
	"fmt"

	"benches/pkg/api/search"

	"github.com/Masterminds/squirrel"
)

type sortOptions struct {
	Field string
	Order string
}

type paginateOptions struct {
	Page    int
	PerPage int
}

type filterOptions []filterOption

type filterOption struct {
	Filed    string
	Value    string
	Operator string
}

func NewSortOptions(field, order string) SortOptions {
	return &sortOptions{
		Field: field,
		Order: order,
	}
}

func NewFilterOptions(filters *[]search.Option) FilterOptions {
	options := make(filterOptions, len(*filters))
	for index, filter := range *filters {
		options[index] = filterOption{
			Filed:    filter.Field,
			Value:    filter.Value,
			Operator: filter.Operator,
		}
	}

	return &options
}

func (options *filterOptions) GetFilters() []map[string]any {
	filters := make([]map[string]any, len(*options))
	for _, filter := range *options {
		var operator map[string]any
		switch filter.Operator {
		case "eq":
			operator = squirrel.Eq{filter.Filed: filter.Value}
		case "lte":
			operator = squirrel.Lt{filter.Filed: filter.Value}
		case "gte":
			operator = squirrel.Lt{filter.Filed: filter.Value}
		default:
			operator = squirrel.Eq{filter.Filed: filter.Value}
		}

		filters = append(filters, operator)
	}

	return filters
}

func (options *sortOptions) GetOrderBy() string {
	return fmt.Sprintf("%s %s", options.Field, options.Order)
}

func NewPaginateOptions(page, perPage int) PaginateOptions {
	return &paginateOptions{
		Page:    page,
		PerPage: perPage,
	}
}

func (options *paginateOptions) GetPage() uint64 {
	return uint64(options.Page)
}

func (options *paginateOptions) GetPerPage() uint64 {
	return uint64(options.PerPage)
}

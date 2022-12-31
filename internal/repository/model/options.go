package model

import "fmt"

type sortOptions struct {
	Field string
	Order string
}

func NewSortOptions(field, order string) SortOptions {
	return &sortOptions{
		Field: field,
		Order: order,
	}
}

func (options *sortOptions) GetOrderBy() string {
	return fmt.Sprintf("%s %s", options.Field, options.Order)
}

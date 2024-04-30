declare namespace CommonTypes {
  type Option = {
    label: string
    value: string
  }

  type ResponsePagination = {
    count: number
    count_all_pages: number
    current_page: number
    per_page: number
  }

  type Pagination = {
    total: number
    countPages: number
    page: number
    perPage: number
  }

  type PayloadPagination = Omit<Pagination, 'total'>

  type TableType<T = unknown> = {
    items: T
    pagination: CommonTypes.ResponsePagination
  }

  type Status = 'success' | 'error'
}

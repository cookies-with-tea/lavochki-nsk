import { ChangeEvent, ReactNode } from 'react'

export interface IPaginationProps {
  page: number
  defaultPage?: number
  total?: number // Count of elements.
  countPages?: number // Count of pages.
  pageSize?: number // Limit.
  prevIcon?: ReactNode
  nextIcon?: ReactNode
  disabled?: boolean
  hideOnSinglePage?: boolean
  background?: boolean
  boundaryCount?: number // The number of neighbors from the last elements.
  siblingCount?: number // The number of neighbors from the active element.
  showLastButton?: boolean
  showFirstButton?: boolean
  hideNextButton?: boolean
  hidePrevButton?: boolean

  onChange?: (event: ChangeEvent, page: number) => void
}

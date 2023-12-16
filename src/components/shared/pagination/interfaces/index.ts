import { ReactNode } from 'react'

export interface IPaginationProps {
  page: number
  total?: number
  pageCount?: number
  pageSize?: number
  prevIcon?: ReactNode
  nextIcon?: ReactNode
  disabled?: boolean
  hideOnSinglePage?: boolean
  background?: boolean

  onChange?: (page: number) => void
}

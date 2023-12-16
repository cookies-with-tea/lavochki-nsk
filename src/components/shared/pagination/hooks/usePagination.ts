'use client'

import { IPaginationProps } from '@/components/shared/pagination/interfaces'

export const usePagination = (props: IPaginationProps) => {
  const createRange = (start: number, end: number) => {
    const length = end - start + 1

    return Array.from({ length }, (_, i) => start + i)
  }
}

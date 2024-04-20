import { Pagination, PaginationProps, Table } from '@mantine/core'
import { ReactNode } from 'react'

type UiTableProps = {
  children: ReactNode
  pagination?: PaginationProps
}

export const UiTable = ({ children, pagination }: UiTableProps) => {
  return (
    <div className={'ui-table'}>
      <Table withRowBorders={false}>{children}</Table>

      {pagination && <Pagination withEdges {...pagination} />}
    </div>
  )
}

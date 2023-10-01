import { Table } from 'antd'
import { TableProps } from 'antd/es/table'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { Key } from 'react'

import styles from 'widgets/w-table/ui/styles.module.scss'

const cx = cnBind.bind(styles)

const rowSelection = {
  onChange: (selectedRowKeys: Key[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
}

export const WTable = <T extends object>(props: TableProps<T>) => {
  return (
    <Table
      rowKey={'id'}
      className={cn(cx('w-table'))}
      rowSelection={{
        ...rowSelection
      }}
      {...props}
      pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
    />
  )
}

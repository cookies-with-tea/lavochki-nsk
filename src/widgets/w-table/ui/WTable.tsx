import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from 'widgets/w-table/ui/styles.module.scss'

const cx = cnBind.bind(styles)

interface IProps<T> {
  dataSource: Array<T>
  columns: ColumnsType<T>
}

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
}

export const WTable = <T extends object>({ dataSource, columns }: IProps<T>) => {
  return (
    <Table
      rowKey={'id'}
      className={cn(cx('w-table'))}
      columns={columns}
      dataSource={dataSource}
      rowSelection={{
        ...rowSelection
      }}
      pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }} 
    />
  )
}
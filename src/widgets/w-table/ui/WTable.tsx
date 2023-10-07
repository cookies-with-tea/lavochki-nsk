import { Table } from 'antd'
import { TableProps } from 'antd/es/table'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { Key, useEffect, useRef, useState } from 'react'

import styles from 'widgets/w-table/ui/styles.module.scss'

import { SLoader } from 'shared/ui'

interface IProps<T> extends TableProps<T>{
  loading?: boolean
}

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

export const WTable = <T extends object>(props: IProps<T>) => {
  const tableRef = useRef<HTMLDivElement | null>(null)
  // TODO: Костыль, который позволяет записать рефку
  const [_, setRef] = useState<any>()

  useEffect(() => {
    setRef(tableRef.current)
  }, [tableRef])

  return (
    <>
      <Table
        ref={tableRef}
        rowKey={'id'}
        className={cn(cx('w-table'))}
        rowSelection={{
          ...rowSelection
        }}
        pagination={{ 
          position: ['bottomCenter'],
          hideOnSinglePage: true,
          ...props.pagination
        }}
        {...props}
        loading={false}
      />

      <SLoader loading={props.loading} target={tableRef.current} />
    </>
  )
}

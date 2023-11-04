import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { FBenchDelete } from 'features/bench/delete/ui/FBenchDelete'

import { events } from 'entities/bench'

import { BenchType, BenchTypes } from 'shared/types'
import { SButton } from 'shared/ui'

export const benchesColumns: ColumnsType<BenchTypes.One> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'ID владельца',
    dataIndex: 'owner',
  },
  {
    title: 'Широта',
    dataIndex: 'lat',
  },
  {
    title: 'Долгота',
    dataIndex: 'lng',
  },
  {
    title: 'Адрес',
    dataIndex: 'street',
  },
  {
    title: 'Дата создания',
    dataIndex: 'created_at',
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <SButton
          onClick={
            async (event) => {
              // events.dialogOpened(record.id)

              event.stopPropagation()
            }}
        >
          Редактировать
        </SButton>

        <FBenchDelete id={record.id} />
      </Space>
    ),
  },
]

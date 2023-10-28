import { SButton } from 'shared/ui'
import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { events } from 'entities/bench'

import { BenchType } from 'shared/types'
import { FBenchDelete } from 'features/bench/delete/ui/FBenchDelete'

export const benchesColumns: ColumnsType<BenchType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 330,
  },
  {
    title: 'ID владельца',
    dataIndex: 'owner',
    key: 'owner',
    width: 330,
  },
  {
    title: 'Широта',
    dataIndex: 'lat',
    key: 'lat',
    width: 120,
  },
  {
    title: 'Долгота',
    dataIndex: 'lng',
    key: 'lng',
    width: 120,
  },
  {
    title: 'Адрес',
    dataIndex: 'street',
    key: 'street',
  },
  {
    title: 'Дата создания',
    dataIndex: 'created_at',
    key: 'created_at',
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

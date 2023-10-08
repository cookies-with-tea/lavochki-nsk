import { SButton } from 'shared/ui'
import { Space, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { events } from 'entities/bench'

import { BenchType } from 'shared/types'

export const benchesColumns: ColumnsType<BenchType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'ID владельца',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Широта',
    dataIndex: 'lat',
    key: 'lat',
  },
  {
    title: 'Долгота',
    dataIndex: 'lng',
    key: 'lng',
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
              events.dialogOpened(record.id)

              event.stopPropagation()
            }}
        >
          Редактировать
        </SButton>
        <SButton
          onClick={
            (event) => {
              event.stopPropagation()

              // TODO: Добавить удаление
            }}
        >
          Удалить
        </SButton>
      </Space>
    ),
  },
]

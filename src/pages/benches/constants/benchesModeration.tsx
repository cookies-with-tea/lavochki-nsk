import { Space } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { acceptDecisionEvents } from 'features/bench/accept/model'
import { rejectDecisionEvents } from 'features/bench/reject/model'

import { BenchType } from 'shared/types'
import { SButton } from 'shared/ui'

export const benchesModerationColumns: ColumnsType<BenchType> = [
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
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <SButton
          onClick={
            async (event) => {
              event.stopPropagation()

              acceptDecisionEvents.dialogOpened(record.id)
            }}
        >
          Принять
        </SButton>
        <SButton
          onClick={
            (event): void => {
              event.stopPropagation()

              rejectDecisionEvents.dialogOpened(record.id)
            }}
        >
          Отклонить
        </SButton>
      </Space>
    ),
  },
]

import { useUnit } from 'effector-react'

import { benchesModerationColumns } from 'pages/benches/constants'
import { moderationBenchesSelectors, moderationBenchesEvents } from 'pages/benches/model/moderation-benches'

import { WTable } from 'widgets/w-table'

import { BenchTypes } from 'shared/types'

export const BenchesModerationTable = () => {
  const [
    benches,
    pagination,
    pending,
  ] = useUnit([
    moderationBenchesSelectors.benches,
    moderationBenchesSelectors.pagination,
    moderationBenchesSelectors.isBenchesPending,
  ])

  return (
    <WTable<BenchTypes.One>
      loading={pending}
      dataSource={benches}
      columns={benchesModerationColumns}
      rowKey={'id'}
      onRow={(record) => {
        return {
          onClick: async (event) => {
            if (event.ctrlKey) return

            // events.drawerOpened(record.id)
          }
        }
      }}
      pagination={{
        current: pagination.page,
        total: pagination.total,
        pageSize: pagination.perPage,
        onChange: (page) => {
          moderationBenchesEvents.pageChanged(page)
        }
      }}
    />
  )
}

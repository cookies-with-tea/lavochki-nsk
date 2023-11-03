import { useUnit } from 'effector-react'

import { benchesModerationColumns } from 'pages/benches/constants'
import { moderationBenchesSelectors, moderationBenchesEvents } from 'pages/benches/model/moderation-benches'

import { WTable } from 'widgets/w-table'

import { BenchType } from 'shared/types'

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
    <WTable<BenchType>
      loading={pending}
      dataSource={benches}
      columns={benchesModerationColumns}
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

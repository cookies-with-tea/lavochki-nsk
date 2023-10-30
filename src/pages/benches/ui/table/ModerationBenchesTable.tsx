import { useUnit } from 'effector-react'

import { benchesModerationColumns } from 'pages/benches/constants'
// import { selectors } from 'pages/benches/model/benches'
import { events } from 'pages/benches/model/detail-bench'

import { WTable } from 'widgets/w-table'

import { BenchType } from 'shared/types'
import { moderationBenchesSelectors, moderationBenchesEvents } from 'pages/benches/model/moderation-benches'

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
        total: pagination.total,
        pageSize: pagination.perPage,
        onChange: (page) => {
          moderationBenchesEvents.pageChanged(page)
        }
      }}
    />
  )
}

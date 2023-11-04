import { useUnit } from 'effector-react'

import { benchesColumns } from 'pages/benches/constants'
import { simpleBenchesEvents, simpleBenchesSelectors } from 'pages/benches/model/simple-benches'

import { WTable } from 'widgets/w-table'

import { BenchTypes } from 'shared/types'

export const BenchesTable = () => {
  const [
    benches,
    pagination,
    pending,
  ] = useUnit([
    simpleBenchesSelectors.benches,
    simpleBenchesSelectors.pagination,
    simpleBenchesSelectors.isBenchesPending,
  ])

  return (
    <>
      <WTable<BenchTypes.One>
       loading={pending}
       className={'benches-table'}
       dataSource={benches}
       columns={benchesColumns}
       onRow={(record) => {
        return {
          onClick: (event) => {
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
           simpleBenchesEvents.pageChanged(page)
         }
       }}
      />
    </>

  )
}

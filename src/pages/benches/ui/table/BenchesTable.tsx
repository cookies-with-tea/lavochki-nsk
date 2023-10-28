import { useUnit } from 'effector-react'

import { benchesColumns } from 'pages/benches/constants'
// import { selectors } from 'pages/benches/model/benches'
// import { events } from 'pages/benches/model/detail-bench'

import { simpleBenchesSelectors } from 'pages/benches/model/simple-benches'

import { WTable } from 'widgets/w-table'

import { BenchType } from 'shared/types'

export const BenchesTable = () => {
  const [benches, pending] = useUnit([simpleBenchesSelectors.benches, simpleBenchesSelectors.isBenchesPending])

  return (
    <>
      <WTable<BenchType>
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
      // pagination={{
      //   // total: pagination.total,
      //   pageSize: pagination.perPage,
      //   onChange(page, pageSize) {
      //       console.log(page)
      //   },
      // }}
      />
    </>

  )
}

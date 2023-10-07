import { useUnit } from 'effector-react'

import { getDetailBenchFx } from 'pages/benches/api'
import { benchesColumns } from 'pages/benches/constants'
import { selectors } from 'pages/benches/model/benches'

import { WTable } from 'widgets/w-table'

import { BenchType } from 'shared/types'

export const BenchesTable = () => {
  const [benches, pending, pagination] = useUnit([selectors.benches, selectors.isBenchesPending, selectors.pagination])

  return (
    <>
    <WTable<BenchType>
     loading={pending} className={'benches-table'}
      dataSource={benches} columns={benchesColumns}
      onRow={(record) => {
      return {
        onClick: async (event) => {
          if (event.ctrlKey) return

          await getDetailBenchFx(record.id)
        }
      }
    }}
    pagination={{
      total: pagination.total,
      pageSize: pagination.perPage,
      onChange(page, pageSize) {
          console.log(page)
      },
    }}
    />
    </>
    
  )
}

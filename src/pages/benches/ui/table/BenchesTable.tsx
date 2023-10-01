import { useUnit } from 'effector-react'

import { getDetailBenchFx } from 'pages/benches/api'
import { benchesColumns } from 'pages/benches/constants'
import { selectors } from 'pages/benches/model/benches'

import { WTable } from 'widgets/w-table'

import { BenchType } from 'shared/types'

export const BenchesTable = () => {
  return (
    <WTable<BenchType> dataSource={useUnit(selectors.benches)} columns={benchesColumns}
    onRow={(record) => {
      return {
        onClick: async (event) => {
          if (event.ctrlKey) return

          await getDetailBenchFx(record.id)
        }
      }
    }}
    />
  )
}

import { useUnit } from 'effector-react'

import { benchesColumns } from 'pages/benches/constants'
import { selectors } from 'pages/benches/model/benches'

import { WTable } from 'widgets/w-table'

import { BenchType } from 'shared/types'

import { getDetailBenchFx } from '../../api'

export const BenchesModerationTable = () => {
  const [benches, ] = useUnit([selectors.benches])

  return (
    <WTable<BenchType>
      dataSource={benches}
      columns={benchesColumns}
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

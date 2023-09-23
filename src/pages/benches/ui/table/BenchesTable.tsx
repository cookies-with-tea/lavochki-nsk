import { useUnit } from 'effector-react'

import { benchesColumns } from 'pages/benches/constants'
import { selectors } from 'pages/benches/model/benches'

import { WTable } from 'widgets/w-table'

import { BenchType } from 'shared/types'

export const BenchesTable = () => {
  const [benches] = useUnit([selectors.benches])

  return (
    <WTable<BenchType> dataSource={benches} columns={benchesColumns} />
  )
}
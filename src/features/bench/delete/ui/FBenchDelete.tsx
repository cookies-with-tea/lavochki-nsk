import { MouseEvent } from 'react'

import { deleteBenchEvents } from 'features/bench/delete/model'

import { BenchType } from 'shared/types'
import { SButton } from 'shared/ui'

interface IProps {
  id: BenchType['id']
}

export const FBenchDelete = ({ id }: IProps) => {
  const handleBenchDelete = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()

    deleteBenchEvents.benchDeleted(id)
  }

  return (
    <SButton onClick={handleBenchDelete}>Удалить</SButton>
  )
}

import { FC, ReactElement } from 'react'
import {
  StyledTitle
} from '@/app/components/pages/BenchDetail/BenchDetailNear/BenchDetailNear.style'
import { BenchType } from '@/app/types/bench.type'
import { BenchDetailNearSlider }
  from '@/app/components/pages/BenchDetail/BenchDetailNear/BenchDetailNearSlider/BenchDetailNearSlider'

interface IProps {
  benches: BenchType[]
}

export const  BenchDetailNear: FC<IProps> = ({ benches }): ReactElement => {
  return (
    <div className={'mb-36'}>
      <StyledTitle>Лавочки рядом</StyledTitle>
      <BenchDetailNearSlider benches={benches} />
    </div>
  )
}

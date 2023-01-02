import { FC, ReactElement } from 'react'
import {
  StyledTitle
} from '@/app/components/pages/BenchDetail/BenchDetailNear/BenchDetailNear.style'
import { BenchType } from '@/app/types/bench.type'

interface IProps {
  benches: BenchType[]
}

const BenchDetailNear: FC<IProps> = ({ benches }): ReactElement => {
  return (
    <div>
      <StyledTitle>Лавочки рядом</StyledTitle>
      {  benches.map((bench, index) => <div key={index}>{bench.id}</div>)}
    </div>
  )
}

export default BenchDetailNear
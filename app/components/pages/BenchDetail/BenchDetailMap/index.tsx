import { FC, ReactElement } from 'react'
import {
  StyledCoords,
  StyledWatchOnTheMap
} from
  '@/app/components/pages/BenchDetail/BenchDetailMap/DetailedBenchMap.styles'
import { BenchType } from '@/app/types/bench.type'
import BenchesMap from '@/app/components/ui/Benches/BenchesMap'

interface IProps {
  bench: BenchType
}

const BenchDetailMap: FC<IProps> = ({ bench }): ReactElement => {
  return (
    <div className={'mb-40'}>
      <StyledWatchOnTheMap>Смотреть на карте</StyledWatchOnTheMap>
      <BenchesMap height={400} bench={bench} />
      <StyledCoords>{bench.lat}, {bench.lng}</StyledCoords>
    </div>
  )
}

export default BenchDetailMap

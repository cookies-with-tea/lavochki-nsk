import { FC, ReactElement } from 'react'
import {
  StyledCoords,
  StyledWatchOnTheMap
} from
  '@/app/components/pages/BenchDetail/BenchDetailMap/DetailedBenchMap.styles'
import { BenchType } from '@/app/types/bench.type'
import BenchesMap from '@/app/components/ui/Benches/BenchesMap'
import { YMapsApi } from 'react-yandex-maps'
import { MapStateOptionsType } from '@/app/types/map.type'

interface IProps {
  bench: BenchType
  mapSettings: MapStateOptionsType
  setMapInstance: (mapInstance: YMapsApi | null) => void
}

const BenchDetailMap: FC<IProps> = ({
  bench,
  mapSettings,
  setMapInstance
}): ReactElement => {
  return (
    <div className={'mb-40'}>
      <StyledWatchOnTheMap>Смотреть на карте</StyledWatchOnTheMap>
      <BenchesMap height={400} bench={bench} setMapInstance={setMapInstance} mapSettings={mapSettings} />
      <StyledCoords>{bench.lat}, {bench.lng}</StyledCoords>
    </div>
  )
}

export default BenchDetailMap

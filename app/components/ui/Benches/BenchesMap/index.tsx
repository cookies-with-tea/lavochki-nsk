import { FC, ReactElement } from 'react'
import { BenchType } from '@/app/types/bench.type'
import { YMaps, Map } from 'react-yandex-maps'
import BenchesMapPlacemarks
  from '@/app/components/ui/Benches/BenchesMap/BenchesMapPlacemarks'

const mapState = {
  center: [55.00, 82.95],
  zoom: 9,
  behaviors: ['default', 'scrollZoom']
}

interface IProps {
  height: number
  bench?: BenchType
  benches?: BenchType[]
}

const BenchesMap: FC<IProps> = ({ height, bench, benches }): ReactElement => {
  return (
    <YMaps>
      <Map
        defaultState={mapState}
        width='100%'
        height={height}
      >
        <BenchesMapPlacemarks benches={benches} bench={bench} />
      </Map>
    </YMaps>
  )
}

export default BenchesMap

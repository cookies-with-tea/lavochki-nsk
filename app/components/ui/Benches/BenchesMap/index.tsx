import { FC, ReactElement, useEffect, useState } from 'react'
import { BenchType } from '@/app/types/bench.type'
import { YMaps, Map, YMapsApi } from 'react-yandex-maps'
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
  setMapInstance: (mapInstance: YMapsApi | null) => void
}

const BenchesMap: FC<IProps> = ({ height, bench, benches, setMapInstance }): ReactElement => {
  const [map, setMap] = useState<YMapsApi | null>(null)

  useEffect(() => {
    if (map) {
      setMapInstance(map)
    }
  }, [map])

  return (
    <YMaps  
      query={{
        ns: 'use-load-option',
        load: 'package.full',
        apikey: process.env.YANDEX_KEY
      }}>
      <Map
        defaultState={mapState}
        width='100%'
        height={height}
        instanceRef={setMap}
        onLoad={(ymaps) => {
          setMap(ymaps)
        }}
        modules={['geolocation', 'geocode']}
      >
        <BenchesMapPlacemarks benches={benches} bench={bench} />
      </Map>
    </YMaps>
  )
}

export default BenchesMap

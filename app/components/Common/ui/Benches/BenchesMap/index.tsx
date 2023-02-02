import { FC, ReactElement, useEffect, useState } from 'react'
import { BenchType } from '@/app/types/bench.type'
import { YMaps, Map } from '@pbe/react-yandex-maps'
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing'
import BenchesMapPlacemarks
  from '@/app/components/Common/ui/Benches/BenchesMap/BenchesMapPlacemarks'
import { MapStateOptionsType } from '@/app/types/map.type'

interface IProps {
  height: number
  bench?: BenchType
  benches?: BenchType[]
  setMapInstance: (mapInstance: YMapsApi | null) => void
  mapSettings: MapStateOptionsType
}

const BenchesMap: FC<IProps> = ({
  height,
  bench,
  benches,
  setMapInstance,
  mapSettings
}): ReactElement => {
  const [map, setMap] = useState<YMapsApi | null>(null)
  const [mapState, setMapState] = useState({} as MapStateOptionsType)

  useEffect(() => {
    setMapState({
      ...mapState,
      center: mapSettings.center,
      zoom: mapSettings.zoom,
    })
  }, [mapSettings.zoom, mapSettings.center])

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
        version={'2.1.79'}
        state={mapState}
        width={'100%'}
        height={height}
        instanceRef={setMap}
        onLoad={(ymaps) => {
          setMap(ymaps)
        }}
        modules={[
          'geolocation',
          'geocode',
          'geoObject.addon.balloon',
          'geoObject.addon.hint'
        ]}
      >
        <BenchesMapPlacemarks
          benches={benches}
          bench={bench}
        />
      </Map>
    </YMaps>
  )
}

export default BenchesMap

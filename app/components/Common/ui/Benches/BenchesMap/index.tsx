import { FC, ReactElement, useEffect, useState } from 'react'
import { BenchType } from '@/app/types/bench.type'
import { YMaps, Map } from '@pbe/react-yandex-maps'
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing'
import BenchesMapPlacemarks
  from '@/app/components/Common/ui/Benches/BenchesMap/BenchesMapPlacemarks'
import { MapStateOptionsType } from '@/app/types/map.type'
import { Box } from '@mui/material'
import {
  StyledZoomButton,
  StyledZoomControl,
  StyledZoomSlider
} from '@/app/components/pages/Home/HomeMap/HomeMap.style'
import CommonIcon from '@/app/components/Common/ui/CommonIcon/CommonIcon'
import { IEvent } from 'yandex-maps'

interface IProps {
  height: number
  bench?: BenchType
  benches?: BenchType[]
  setMapInstance?: (mapInstance: YMapsApi | null) => void
  mapSettings: MapStateOptionsType
}

const BenchesMap: FC<IProps> = ({
  height,
  bench,
  benches,
  mapSettings
}): ReactElement => {
  const [map, setMap] = useState<YMapsApi | null>(null)
  const [ymaps, setYmaps] = useState<YMapsApi | null>(null)
  const [mapState, setMapState] = useState({} as MapStateOptionsType)

  const changeZoom = (value: number): void => {
    setMapState({
      ...mapState,
      ...mapSettings,
      zoom: value,
    })
  }

  const onZoomChange = (event: Event, newValue: number | number[]): void => {
    if (typeof newValue === 'number') {
      changeZoom(newValue)
    }
  }

  const watchBoundsChange = (e: IEvent): void => {
    const newZoom = e.get('newZoom') || 0
    const oldZoom = e.get('oldZoom') || 0

    if (newZoom != oldZoom) {
      changeZoom(newZoom)
    }
  }

  const handleZoomChange = (increase?: boolean): void => {
    let currentZoom = mapState.zoom

    increase ? changeZoom(++currentZoom) : changeZoom(--currentZoom)
  }

  useEffect(() => {
    if (map && ymaps) {
      // TODO: Найти где-то типизацию этого
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map.events.add('boundschange', watchBoundsChange)
    }

    setMapState({
      ...mapSettings
    })

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map?.events.remove('boundschange', watchBoundsChange)
    }
  }, [map, mapSettings])

  return (
    <div className={'p-relative'}>
      <YMaps
        query={{
          ns: 'use-load-option',
          load: 'package.full',
          apikey: process.env.YANDEX_KEY
        }}
      >
        <Map
          version={'2.1.79'}
          state={mapState}
          width={'100%'}
          height={height}
          instanceRef={(ref) => {
            if (ref) {
              setMap(ref)
            }
          }}
          onLoad={(ymaps) => {
            setYmaps(ymaps)
          }}
          modules={[
            'domEvent.manager',
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

          <StyledZoomControl>
            <StyledZoomButton onClick={handleZoomChange.bind(null, true)}>
              <CommonIcon name={'arrow-light'} width={24} height={24} />
            </StyledZoomButton>

            <Box sx={{
              height: '120px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <StyledZoomSlider
                min={2}
                max={22}
                step={1}
                orientation="vertical"
                defaultValue={mapState.zoom}
                value={mapState.zoom}
                aria-label="Zoom"
                valueLabelDisplay="auto"
                onChange={onZoomChange}
              />
            </Box>

            <StyledZoomButton onClick={handleZoomChange.bind(null, false)}>
              <CommonIcon name={'arrow-light'} width={24} height={24} />
            </StyledZoomButton>
          </StyledZoomControl>
        </Map>
      </YMaps>
    </div>
  )
}

export default BenchesMap

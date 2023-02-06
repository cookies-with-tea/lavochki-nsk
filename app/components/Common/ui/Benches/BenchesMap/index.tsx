import { FC, ReactElement, useEffect, useState } from 'react'
import { BenchType } from '@/app/types/bench.type'
import { YMaps, Map } from '@pbe/react-yandex-maps'
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing'
import BenchesMapPlacemarks
  from '@/app/components/Common/ui/Benches/BenchesMap/BenchesMapPlacemarks'
import { MapStateOptionsType } from '@/app/types/map.type'
import { Box } from '@mui/material'
import {
  StyledMapButton, StyledResetMapButton,
  StyledZoomControl,
  StyledZoomSlider
} from '@/app/components/pages/Home/HomeMap/HomeMap.style'
import CommonIcon from '@/app/components/Common/ui/CommonIcon/CommonIcon'
import { IEvent } from 'yandex-maps'

interface IProps {
  height: number
  bench?: BenchType
  benches?: BenchType[]
  mapSettings: MapStateOptionsType
  setMapInstance?: (mapInstance: YMapsApi | null) => void
  resetMap?: () => void
}

const BenchesMap: FC<IProps> = ({
  height,
  bench,
  benches,
  mapSettings,
  resetMap
}): ReactElement => {
  const [map, setMap] = useState(null)
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
    setMapState({
      ...mapSettings
    })
  }, [mapSettings])

  useEffect(() => {
    if (map && ymaps) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map.events.add('boundschange', watchBoundsChange)
    }
  }, [map, ymaps])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map?.events.remove('boundschange', watchBoundsChange)
    }
  }, [])

  return (
    <div className={'p-relative'}>
      <YMaps
        query={{
          ns: 'use-load-option',
          load: 'package.full',
          apikey: process.env.YANDEX_KEY,
          lang: 'en_RU'
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
          onLoad={setYmaps}
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

          <StyledResetMapButton onClick={resetMap}>
            <CommonIcon name={'reset'} width={24} height={24} />
          </StyledResetMapButton>

          <StyledZoomControl>
            <StyledMapButton onClick={handleZoomChange.bind(null, true)}>
              <CommonIcon name={'arrow-light'} width={24} height={24} />
            </StyledMapButton>

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

            <StyledMapButton onClick={handleZoomChange.bind(null, false)}>
              <CommonIcon name={'arrow-light'} width={24} height={24} />
            </StyledMapButton>
          </StyledZoomControl>
        </Map>
      </YMaps>
    </div>
  )
}

export default BenchesMap

'use client'

import styles from './styles.module.scss'
import { Map, YMaps } from '@pbe/react-yandex-maps'
import { mapConfig } from '@/components/widgets/map/config'
import { YandexMapClusterer } from '@/components/widgets/map/YandexMapClusterer'
import cn from 'classnames'
import { BenchTypes } from '@/shared/types/bench'

interface IYandexMapProps {
  height?: number
  className?: string
  benches: BenchTypes.All
}

export const YandexMap = ({ height = 396, className = '', benches }: IYandexMapProps) => {
  // const { data } = useBenches()

  return (
    <div className={cn('yandex-map', styles['yandex-map'], className)}>
      <YMaps query={mapConfig.MAP_QUERY}>
        <Map
          width={'100%'}
          height={height}
          version={mapConfig.MAP_PARAMS.version}
          defaultState={mapConfig.MAP_PARAMS.defaultState}
          modules={mapConfig.MAP_PARAMS.modules}
        >
          <YandexMapClusterer benches={benches} />
        </Map>
      </YMaps>
    </div>
  )
}

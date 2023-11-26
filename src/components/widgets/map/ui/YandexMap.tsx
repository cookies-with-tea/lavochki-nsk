'use client'

import styles from './styles.module.scss'
import { Map, YMaps } from '@pbe/react-yandex-maps'
import { mapConfig } from '@/components/widgets/map/config'
import { YandexMapClusterer } from '@/components/widgets/map/YandexMapClusterer'
import { BENCHES_MOCK_DATA } from '@/shared/mocks/benches'
import { generateClassNames } from '@/shared/lib/utils'

interface IYandexMapProps {
  height?: number
  className?: string
}

export const YandexMap = ({ height = 396, className = '' }: IYandexMapProps) => {
  return (
    <div className={generateClassNames([styles['yandex-map'], className])}>
      <YMaps query={mapConfig.MAP_QUERY}>
        <Map
          width={'100%'}
          height={height}
          version={mapConfig.MAP_PARAMS.version}
          defaultState={mapConfig.MAP_PARAMS.defaultState}
          modules={mapConfig.MAP_PARAMS.modules}
        >
          <YandexMapClusterer benches={BENCHES_MOCK_DATA.items} />
        </Map>
      </YMaps>
    </div>
  )
}

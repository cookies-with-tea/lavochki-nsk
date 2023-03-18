import { FC, ReactElement, useContext } from 'react'
import {
  StyledCoords,
  StyledWatchOnTheMap
} from
  '@/app/components/pages/BenchDetail/BenchDetailMap/DetailedBenchMap.styles'
import { BenchType } from '@/app/types/bench.type'
import { BenchesMap } from '@/app/components/Common/ui/Benches/BenchesMap/BenchesMap'
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing'
import { MapStateOptionsType } from '@/app/types/map.type'
import { MapContext } from '@/app/contexts/mapContext'
import { useRouter } from 'next/router'

interface IProps {
  bench: BenchType
  mapSettings: MapStateOptionsType
  setMapInstance: (mapInstance: YMapsApi | null) => void
}

export const BenchDetailMap: FC<IProps> = ({
  bench,
  mapSettings,
  setMapInstance
}): ReactElement => {
  const mapContext = useContext(MapContext)
  const router = useRouter()
  const handleMapStateChange = async ():  Promise<void> => {
    if (mapContext.dispatch) {
      mapContext.dispatch({
        ...mapContext.mapState,
        zoom: 18,
        center: mapSettings.center
      })

      await router.push('/')
    }
  }

  return (
    <div className={'mb-40'}>
      <StyledWatchOnTheMap onClick={handleMapStateChange}>Смотреть на карте</StyledWatchOnTheMap>
      <BenchesMap height={400} bench={bench} setMapInstance={setMapInstance} mapSettings={mapSettings} />
      <StyledCoords>{bench.lat}, {bench.lng}</StyledCoords>
    </div>
  )
}

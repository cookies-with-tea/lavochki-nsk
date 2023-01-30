import { FC, ReactElement } from 'react'
import { BenchType } from '@/app/types/bench.type'
import BenchesMap from '@/app/components/Common/ui/Benches/BenchesMap'
import { YMapsApi } from 'react-yandex-maps'
import { MapStateOptionsType } from '@/app/types/map.type'

interface IProps {
  benches?: BenchType[]
  setMapInstance: (mapInstance: YMapsApi | null) => void
  mapSettings: MapStateOptionsType
}

const HomeMap: FC<IProps> = ({ benches, setMapInstance, mapSettings }): ReactElement => {
  return (
    <div className="mb-52">
      <h2>Расположение лавочек</h2>

      <BenchesMap
        height={500}
        benches={benches}
        setMapInstance={setMapInstance}
        mapSettings={mapSettings}
      />
    </div>
  )
}

export default HomeMap

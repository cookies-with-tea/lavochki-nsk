import { FC, ReactElement } from 'react'
import { BenchType } from '@/app/types/bench.type'
import BenchesMap from '@/app/components/ui/Benches/BenchesMap'
import { YMapsApi } from 'react-yandex-maps'

interface IProps {
  benches?: BenchType[]
  setMapInstance: (mapInstance: YMapsApi | null) => void
}

const HomeMap: FC<IProps> = ({ benches, setMapInstance }): ReactElement => {
  return (
    <div className="mb-52">
      <h2>Расположение лавочек</h2>
      <BenchesMap height={500} benches={benches} setMapInstance={setMapInstance} />
    </div>
  )
}

export default HomeMap

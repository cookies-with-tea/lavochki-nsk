import { Clusterer } from '@pbe/react-yandex-maps'
import { yandexMapClustererConfig } from '@/components/widgets/map/YandexMapClusterer/config'
import { BenchTypes } from '@/shared/types/bench'
import { YandexMapPlacemark } from '@/components/widgets/map/YandexMapPlacemark'

interface IYandexMapClustererBenchesProps {
  benches: BenchTypes.All
}

export const YandexMapClusterer = ({ benches }: IYandexMapClustererBenchesProps) => {
  return (
    <Clusterer options={yandexMapClustererConfig.OPTIONS}>
      { benches && benches.map((bench) => (
        <YandexMapPlacemark geometry={[bench.lat, bench.lng]} key={bench.id} />
      )) }
    </Clusterer>
  )
}

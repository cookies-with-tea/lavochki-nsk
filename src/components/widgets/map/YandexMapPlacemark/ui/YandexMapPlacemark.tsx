import { Placemark } from '@pbe/react-yandex-maps'
import { yandexMapPlacemarkConfig } from '@/components/widgets/map/YandexMapPlacemark/config'
import { AnyObject } from '@pbe/react-yandex-maps/typings/util/typing'
import { IDataManager, IPlacemarkOptions } from 'yandex-maps'

interface IYandexMapPlacemarkProps {
  geometry: [number, number]
  properties?: AnyObject | IDataManager
  options?:  IPlacemarkOptions | undefined
}

export const YandexMapPlacemark = ({ geometry, options, properties }: IYandexMapPlacemarkProps) => {
  return (
    <Placemark
      geometry={geometry}
      properties={properties}
      options={options}
      modules={yandexMapPlacemarkConfig.MODULES}
    />
  )
}

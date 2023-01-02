import { FC, ReactElement } from 'react'
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps'
import { IBench } from '@/app/interfaces/bench.interface'
import { MapBalloonType, MapPointOptions } from '@/app/types/map.type'
import { BenchType } from '@/app/types/bench.type'

const getPointData = (bench: Partial<IBench>): MapBalloonType => {
  const balloonBody = bench.images && bench.images.length
    ?
    (
      `<div class="the-map__balloon-image">
            <img src=${bench.images[0]} alt="bench" />
        </div>
        `
    )
    : ''

  return {
    hintContent: 'Лавочка <strong>#' + bench.id + '</strong>',
    balloonContentBody: balloonBody,
    clusterCaption: 'placemark <strong>' + bench.id + '</strong>'
  }
}

const getPointOptions = (): MapPointOptions => {
  return {
    preset: 'islands#violetIcon'
  }
}

const mapState = {
  center: [55.00, 82.95],
  zoom: 9,
  behaviors: ['default', 'scrollZoom']
}

interface IProps {
  benches?: BenchType[]
}

const HomeMap: FC<IProps> = ({ benches }): ReactElement => {
  return (
    <div className="mb-52">
      <h2>Расположение лавочек</h2>
      <YMaps>
        <Map
          defaultState={mapState}
          width='100%'
          height={500}
        >
          <Clusterer
            options={{
              preset: 'islands#invertedVioletClusterIcons',
              groupByCoordinates: false,
              clusterDisableClickZoom: true,
              clusterHideIconOnBalloonOpen: false,
              geoObjectHideIconOnBalloonOpen: false
            }}
          >
            {
              benches
              && benches.map(
                ({ lat, lng, id, images }: IBench, idx: number) => (
                  <Placemark
                    key={idx}
                    geometry={[lat, lng]}
                    properties={getPointData({ id, images })}
                    options={getPointOptions()}
                    modules={[
                      'geoObject.addon.balloon',
                      'geoObject.addon.hint'
                    ]}
                  />
                ))
            }
          </Clusterer>
        </Map>
      </YMaps>
    </div>
  )
}

export default HomeMap

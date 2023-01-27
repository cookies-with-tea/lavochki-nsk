import React, { FC, ReactElement, useEffect, useState } from 'react'
import { Clusterer, Placemark } from 'react-yandex-maps'
import {  BenchType } from '@/app/types/bench.type'
import { MapBalloonType, MapPointOptions } from '@/app/types/map.type'

interface IProps {
  bench?: BenchType
  benches?: BenchType[]
}
const getPointData = (bench: BenchType): MapBalloonType => {
  const balloonBody = bench.images && bench.images.length
    ? (
      `<div class="benches-map__balloon-image">
            <img src=${bench.images[0]} alt="bench" />
        </div>
        `
    )
    : ''

  return {
    hintContent: `Лавочка <strong>#' ${bench.id} </strong>`,
    balloonContentBody: balloonBody,
    clusterCaption: `placemark <strong> ${bench} </strong>`
  }
}

const getPointOptions = (): MapPointOptions => {
  return {
    iconLayout: 'default#image',
    iconImageHref: '/BenchPlacemark.png',
    iconImageSize: [58, 78],
    iconShape: {
      type: 'Circle',
      coordinates: [0, 0],
      radius: 50
    },
    balloonOffset: [18, -35]
  }
}

const BenchesMapPlacemarks: FC<IProps> = ({
  bench,
  benches
}): ReactElement => {
  const [currentBenches, setCurrentBenches] = useState<BenchType[]>([] as BenchType[])

  useEffect(() => {
    if (bench) {
      setCurrentBenches((prevState) => [...prevState, bench])
    }

    if (benches) {
      setCurrentBenches(benches)
    }

    return () => {
      setCurrentBenches([])
    }
  }, [benches, bench])

  return (
    <Clusterer
      options={{
        preset: 'islands#invertedVioletClusterIcons',
        groupByCoordinates: false,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
        clusterIconColor: '#49260a'
      }}
    >
      {
        currentBenches
        && currentBenches.map(
          ( bench, index) => (
            <Placemark
              key={index}
              geometry={[bench.lat, bench.lng]}
              properties={getPointData(bench)}
              options={getPointOptions()}
              modules={[
                'geoObject.addon.balloon',
                'geoObject.addon.hint',
                'layout.Image'
              ]}
            />
          ))
      }
    </Clusterer>
  )
}

export default BenchesMapPlacemarks
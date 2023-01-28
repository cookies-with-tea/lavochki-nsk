import React, { FC, ReactElement, useEffect, useState } from 'react'
import { Clusterer, Placemark } from 'react-yandex-maps'
import {  BenchType } from '@/app/types/bench.type'
import { MapBalloonType, MapPointOptions } from '@/app/types/map.type'

interface IProps {
  bench?: BenchType
  benches?: BenchType[]
}

const renderBalloonImage = (images: string[]): ReactElement | '' => {
  return images.length ? <img src={images[0]} alt="" /> : ''
}

const getPointData = (bench: BenchType): MapBalloonType => {
  const balloonBody =
      `<div class="benches-map__balloon-image">
            ${renderBalloonImage(bench.images)}
            <div>Лавочка <strong>#${bench.id}</div>
        </div>
        `

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
      coordinates: [20, -12],
      radius: 30
    },
    balloonOffset: [18, -35]
  }
}

const BenchesMapPlacemarks: FC<IProps> = ({
  bench,
  benches,
}): ReactElement => {
  const [currentBenches, setCurrentBenches] = useState<BenchType[]>(
    [] as BenchType[]
  )

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
                'layout.Image'
              ]}
            />
          ))
      }
    </Clusterer>
  )
}

export default BenchesMapPlacemarks
import { GetStaticProps, NextPage } from 'next'
import { ReactElement, useEffect, useState } from 'react'
import HomeMap from '@/app/components/pages/Home/HomeMap'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import BenchService from '@/app/services/Bench/BenchService'
import HomeBenches from '@/app/components/pages/Home/HomeBenches'
import { ErrorType } from '@/app/types/common.type'
import { BenchesResponseType } from '@/app/types/bench.type'
import { YMapsApi } from 'react-yandex-maps'
import { MapStateOptionsType } from '@/app/types/map.type'

const getBenches = async (): Promise<BenchesResponseType> =>
  await BenchService.getAll()

const HomePage: NextPage = (): ReactElement => {
  const [benches, setBenches] = useState<BenchesResponseType>(
    {} as BenchesResponseType
  )
  const [map, setMap] = useState<YMapsApi | null>(null)
  const [mapSettings, setMapSettings] = useState<MapStateOptionsType>({
    center: [55.00, 82.95],
    zoom: 9,
    behaviors: ['default', 'scrollZoom']
  })

  const geoDecoding = (
    benches: BenchesResponseType,
    instance: YMapsApi | null
  ): void => {
    if (!instance) return

    benches?.items?.forEach((bench, index) => {
      instance.geocode([bench.lat, bench.lng])
        .then(({ geoObjects }: Record<string, any>) => {
          const firstGeoObjectLocation = geoObjects
            .get(0)
            .getAddressLine() as string

          const newBenches = [...benches.items]

          newBenches[index] = Object.assign(bench, { address: firstGeoObjectLocation })

          setBenches({
            ...benches,
            items: newBenches,
          })
        })
    })
  }

  useQuery<BenchesResponseType, ErrorType>('get benches', getBenches, {
    onSuccess: (response) => {
      setBenches(response)
    }
  })

  const setMapInstance = (instance: YMapsApi | null): void => {
    setMap(instance)
  }

  const handleMoveToPlacemark = (coordinates: number[], zoom: number): void => {
    setMapSettings({
      ...mapSettings,
      center: coordinates,
      zoom
    })
  }

  useEffect(() => {
    geoDecoding(benches, map)
  }, [map])

  return (
    <>
      <HomeMap
        benches={ benches.items }
        setMapInstance={setMapInstance}
        mapSettings={mapSettings}
      />
      <HomeBenches
        benches={ benches.items }
        moveToPlacemark={handleMoveToPlacemark}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<BenchesResponseType>('get benches', getBenches)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default HomePage
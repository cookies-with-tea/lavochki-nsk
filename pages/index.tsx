import { GetStaticProps, NextPage } from 'next'
import { ReactElement, useEffect, useState } from 'react'
import HomeMap from '@/app/components/pages/Home/HomeMap'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import BenchService from '@/app/services/Bench/BenchService'
import HomeBenches from '@/app/components/pages/Home/HomeBenches'
import { ErrorType } from '@/app/types/common.type'
import { BenchesResponseType } from '@/app/types/bench.type'
import { YMapsApi } from 'react-yandex-maps'

const getBenches = async (): Promise<BenchesResponseType> =>
  await BenchService.getAll()

const HomePage: NextPage = (): ReactElement => {
  const [benches, setBenches] = useState<BenchesResponseType>(
    {} as BenchesResponseType
  )
  const [map, setMap] = useState<YMapsApi | null>(null)

  const geoDecoding = (
    benches: BenchesResponseType,
    instance: YMapsApi | null
  ): void => {
    if (!instance) return

    benches.items.forEach((bench, index) => {
      instance.geocode([bench.lat, bench.lng])
        .then(({ geoObjects }: Record<string, any>) => {
          const firstGeoObjectLocation = geoObjects
            .get(0)
            .getAddressLine() as string

          const newBenches = [...benches.items]

          newBenches[index] = { ...bench, address: firstGeoObjectLocation }

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

  useEffect(() => {
    geoDecoding(benches, map)
  }, [map])

  return (
    <>
      <HomeMap benches={ benches.items } setMapInstance={setMapInstance} />
      <HomeBenches benches={ benches.items } />
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
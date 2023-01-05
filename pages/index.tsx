import { GetStaticProps, NextPage } from 'next'
import { ReactElement, useEffect, useState } from 'react'
import HomeMap from '@/app/components/pages/Home/HomeMap'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import BenchService from '@/app/services/Bench/BenchService'
import HomeBenches from '@/app/components/pages/Home/HomeBenches'
import { ErrorType } from '@/app/types/common.type'
import { BenchType } from '@/app/types/bench.type'
import { YMapsApi } from 'react-yandex-maps'

const getBenches = async (): Promise<BenchType[]> => await BenchService.getAll()

const HomePage: NextPage = (): ReactElement => {
  const [benches, setBenches] = useState<BenchType[] | []>([])
  const [map, setMap] = useState<YMapsApi | null>(null)

  const geoDecoding = (
    benches: BenchType[],
    instance: YMapsApi | null
  ): void => {
    if (!instance) return

    benches.forEach((bench, index) => {
      instance.geocode([bench.lat, bench.lng]).then(({ geoObjects }: Record<string, any>) => {
        const firstGeoObjectLocation = geoObjects
          .get(0)
          .getAddressLine() as string

        const newBenches = [...benches]

        newBenches[index] = Object.assign(bench,
          { address: firstGeoObjectLocation }
        )

        setBenches(newBenches)
      })
    })
  }

  useQuery<BenchType[], ErrorType>('get benches', getBenches, {
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
      <HomeMap benches={ benches } setMapInstance={setMapInstance} />
      <HomeBenches benches={ benches } />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<BenchType[]>('get benches', getBenches)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default HomePage
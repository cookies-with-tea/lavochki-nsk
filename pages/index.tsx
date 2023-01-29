import { GetStaticProps, NextPage } from 'next'
import { ReactElement, useEffect, useState } from 'react'
import HomeMap from '@/app/components/pages/Home/HomeMap'
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query'
import BenchService from '@/app/services/Bench/BenchService'
import HomeBenches from '@/app/components/pages/Home/HomeBenches'
import { ErrorType } from '@/app/types/common.type'
import {
  BenchesParamsType,
  BenchesResponseType,
  // BenchType
} from '@/app/types/bench.type'
// import { YMapsApi } from 'react-yandex-maps'
import { MapStateOptionsType } from '@/app/types/map.type'
import { useInView } from 'react-intersection-observer'
import { Box } from '@mui/material'

const defaultParams = {
  sortOrder: 'desc',
  page: 1,
  perPage: 3
}

const getBenches = async (
  params?: Partial<BenchesParamsType>
): Promise<BenchesResponseType> => await BenchService.getAll(params)

const HomePage: NextPage = (): ReactElement => {
  const { ref, inView } = useInView()
  const [benches, setBenches] = useState<BenchesResponseType>(
    {} as BenchesResponseType
  )
  // const [map, setMap] = useState<YMapsApi | null>(null)
  const [mapSettings, setMapSettings] = useState<MapStateOptionsType>({
    center: [55.00, 82.95],
    zoom: 9,
    behaviors: ['default', 'scrollZoom']
  })
  const [benchesParams, setBenchesParams] = 
    useState<Partial<BenchesParamsType>>({
      sortOrder: 'desc',
      page: 1,
      perPage: 3
    })

  // const geoDecoding = (
  //   benches: BenchesResponseType,
  //   instance: YMapsApi | null
  // ): BenchesResponseType | null | undefined => {
  //   if (!instance) return
  //
  //   const currentBenches: BenchesResponseType = {} as BenchesResponseType
  //   console.log(benches)
  //
  //   benches?.items?.forEach((bench, index) => {
  //     instance.geocode([bench.lat, bench.lng])
  //       .then(({ geoObjects }: Record<string, any>) => {
  //         const firstGeoObjectLocation = geoObjects
  //           .get(0)
  //           .getAddressLine() as string
  //
  //         const newBenches = [...benches.items]
  //
  //         newBenches[index] = Object.assign(bench,
  //           { address: firstGeoObjectLocation }
  //         )
  //
  //         currentBenches.items = newBenches
  //       })
  //   })
  //
  //   return currentBenches
  // }

  const { hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery<BenchesResponseType, ErrorType>(
    'get benches',
    getBenches.bind(null, benchesParams),
    {
      getNextPageParam: () => (benchesParams),
      onSuccess: (response) => {
        response.pages.forEach((page: BenchesResponseType) => {
          if (page) {
            setBenches({
              ...benches,
              ...page
            })
          }
        })
      }
    })

  const handleMoveToPlacemark = (coordinates: number[], zoom: number): void => {
    setMapSettings({
      ...mapSettings,
      center: coordinates,
      zoom
    })
  }

  useEffect(() => {
    const currentPerPage = benchesParams.perPage as number
    const nextPerPage = currentPerPage + 3

    setBenchesParams({
      ...benchesParams,
      perPage: nextPerPage,
    })

    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <>
      <HomeMap
        benches={ benches.items }
        setMapInstance={() => {
          console.log('map instance')
        }}
        mapSettings={mapSettings}
      />
      <HomeBenches
        benches={ benches.items }
        moveToPlacemark={handleMoveToPlacemark}
      />
      { !isLoading && benches?.items?.length ? <Box ref={ref} component={'span'} sx={{ visibility: 'hidden' }}>observer</Box> : null }
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<BenchesResponseType>('get benches', getBenches.bind(null, defaultParams))

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default HomePage
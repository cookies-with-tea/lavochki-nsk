import { GetStaticProps, NextPage } from 'next'
import { ReactElement, useEffect, useState } from 'react'
import { HomeMap } from '@/app/components/pages/Home/HomeMap/HomeMap'
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from 'react-query'
import BenchService from '@/app/services/Bench/BenchService'
import { HomeBenches } from '@/app/components/pages/Home/HomeBenches/HomeBenches'
import { ErrorType } from '@/app/types/common.type'
import {
  BenchesParamsType,
  BenchesResponseType, BenchType,
  // BenchType
} from '@/app/types/bench.type'
// import { YMapsApi } from '@pbe/react-yandex-maps'
import { MapStateOptionsType } from '@/app/types/map.type'
import { useInView } from 'react-intersection-observer'
import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import { useToggle } from '@/app/hooks/useToggle'

const defaultParams = {
  sortOrder: 'desc',
  page: 1,
  perPage: 3
}

const getBenches = async (
  params?: Partial<BenchesParamsType>
): Promise<BenchesResponseType> => await BenchService.getAll(params)

const getAllBenches = async (): Promise<BenchesResponseType> => await BenchService.getAll()

const ImagePreviewWithoutSSR = dynamic(
  () => import('@/app/components/Common/ui/ImagePreview/ImagePreview'),
  { ssr: false }
)

const HomePage: NextPage = (): ReactElement => {
  const { ref, inView } = useInView()
  const [bench, setBench] = useState<BenchType & { imageIndex?: number }>({} as BenchType & { imageIndex?: number })
  const [benches, setBenches] = useState<BenchesResponseType>(
    {} as BenchesResponseType
  )
  const [allBenches, setAllBenches] = useState<BenchesResponseType>(
    {} as BenchesResponseType
  )
  // const [map, setMap] = useState<YMapsApi | null>(null)
  const [mapSettings, setMapSettings] = useState<MapStateOptionsType>({
    center: [55.00, 82.95],
    zoom: 9,
    behaviors: ['default', 'scrollZoom'],
    controls: []
  })
  const [benchesParams, setBenchesParams] = 
    useState<Partial<BenchesParamsType>>({
      sortOrder: 'desc',
      page: 1,
      perPage: 3
    })
  const [isPreviewImageVisible, setIsPreviewImageVisible] = useToggle(false)

  // TODO: Пока что этот функционал выпилил, ибо жду backend для того, чтобы это там было реализовано

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
        response.pages.forEach((page) => {
          setBenches({
            ...benches,
            ...page
          })
        })
      }
    })

  useQuery<BenchesResponseType, ErrorType>(
    'get all benches',
    getAllBenches,
    {
      onSuccess: (response) => {
        setAllBenches(response)
      }
    }
  )

  const handleMoveToPlacemark = (coordinates: number[], zoom: number): void => {
    setMapSettings({
      ...mapSettings,
      center: coordinates,
      zoom
    })
  }

  const findBenchById = (id: string): BenchType | undefined => {
    return benches.items.find((bench) => bench.id === id)
  }

  const onPreviewImageClose = (): void => {
    setIsPreviewImageVisible()
  }

  const handlePreviewImageOpen = (benchId: string, index: number): void => {
    const bench = findBenchById(benchId)
    if (bench) {
      setBench({
        ...bench,
        imageIndex: index,
      })
    }

    setIsPreviewImageVisible()
  }

  const handleResetMap = (): void => {
    setMapSettings({
      center: [55.00, 82.95],
      zoom: 9,
      behaviors: ['default', 'scrollZoom'],
      controls: []
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
        benches={ allBenches.items }
        setMapInstance={() => {
          console.log('map instance')
        }}
        mapSettings={mapSettings}
        resetMap={handleResetMap}
      />

      <HomeBenches
        benches={ benches.items }
        moveToPlacemark={handleMoveToPlacemark}
        openPreviewImage={handlePreviewImageOpen}
      />

      { !isLoading && benches?.items?.length ? <Box ref={ref} component={'span'} sx={{ visibility: 'hidden' }}>observer</Box> : null }

      <ImagePreviewWithoutSSR
        open={isPreviewImageVisible}
        image={bench.images?.[bench.imageIndex as number]}
        title={'Просмотр фотографий'}
        onClose={onPreviewImageClose} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<BenchesResponseType>('get benches', getBenches.bind(null, defaultParams))
  await queryClient.prefetchQuery<BenchesResponseType>('get all benches', getAllBenches)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default HomePage
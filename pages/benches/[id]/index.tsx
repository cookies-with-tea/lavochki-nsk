import React, { ReactElement, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import BenchService from '@/app/services/Bench/BenchService'
import { ErrorType } from '@/app/types/common.type'
import { useRouter } from 'next/router'
import { StyledSubtitle, StyledSubtitleAuthor, StyledTag }
  from '@/pages/benches/[id]/BenchDetail.styles'
import BenchDetailSlider
  from '@/app/components/pages/BenchDetail/BenchDetailSlider'
import BenchDetailMap from '@/app/components/pages/BenchDetail/BenchDetailMap'
import BenchDetailComments
  from '@/app/components/pages/BenchDetail/BenchDetailComments'
import CommentService from '@/app/services/Comment/CommentService'
import {
  BenchTagType,
  BenchesResponseType,
  BenchType
} from '@/app/types/bench.type'
import BenchDetailNear from '@/app/components/pages/BenchDetail/BenchDetailNear'
import { CommentType } from '@/app/types/comment.type'
import { CircularProgress, Fade } from '@mui/material'
import BenchDetailCommentReport
  from '@/app/components/pages/BenchDetail/BenchDetailComment/BenchDetailCommentReport'
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing'
import { MapStateOptionsType } from '@/app/types/map.type'
import { benchDetailDefaultMapSettings } from '@/pages/benches/[id]/BenchDetail.constant'

const getBenches = async (): Promise<BenchesResponseType> => (
  await BenchService.getAll()
)

const getBench = async (id: string): Promise<BenchType> => (
  await BenchService.getById(id)
)

const getComments = async (id: string): Promise<CommentType[]> => (
  await CommentService.getById(id)
)

const BenchDetail: NextPage = (): ReactElement => {
  const router = useRouter()

  const benchId = typeof router.query?.id === 'string' ? router.query.id : ''

  const [isReportDialogVisible, setIsReportDialogVisible] = useState(false)
  const [bench, setBench] = useState<BenchType>({} as BenchType)
  const [comments, setComments] = useState<CommentType[]>([] as CommentType[])
  const [currentCommentId, setCurrentCommentId] = useState('')
  const [benches, setBenches] = useState<BenchesResponseType>({} as BenchesResponseType)
  const [chipData, setChipData] = useState<BenchTagType[]>([] as BenchTagType[])
  const [map, setMap] = useState<YMapsApi | null>(null)
  const [mapSettings, setMapSettings] = useState<MapStateOptionsType>(benchDetailDefaultMapSettings)

  const { refetch: benchRefetch, isFetching: isBenchFething }
    = useQuery<BenchType, ErrorType>(['get bench', benchId],
      getBench.bind(null, benchId), {
        onSuccess: (response) => {
          if (response) {
            setBench(response)

            setChipData(response.tags)

            setMapSettings({
              ...mapSettings,
              center: [response.lat, response.lng]
            })
          }
        },
        enabled: benchId.length > 0,
        staleTime: 1000
      })

  const { refetch: commensRefetch } = useQuery<CommentType[], ErrorType>(
    ['get comments', benchId],
    getComments.bind(null, benchId), 
    {
      onSuccess: (response) => {
        setComments(response)
      },
      enabled: benchId.length > 0,
    })

  useQuery<BenchesResponseType, ErrorType>(
    'get benches',
    getBenches.bind(null),
    {
      onSuccess: (response) => {
        setBenches(response)
      },
    })

  const handleReportDialogVisibleToggle = (id: string): void => {
    setCurrentCommentId(id)

    setIsReportDialogVisible(!isReportDialogVisible)
  }

  const handleReportDialogVisibleClose = (): void => {
    setIsReportDialogVisible(false)
  }

  const handleUpdateData = async (): Promise<void> => {
    await benchRefetch()
    await commensRefetch()
  }


  const renderComments = (): ReactElement => {
    if (isBenchFething) {
      return (
        <Fade
          in={isBenchFething}
          style={{
            transitionDelay: isBenchFething ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      )
    }

    return (
      <BenchDetailComments
        benchId={bench.id}
        comments={comments}
        updateData={handleUpdateData}
        reportDialogToggleVisible={handleReportDialogVisibleToggle}
      />
    )
  }

  const geoDecoding = (bench: BenchType, instance: YMapsApi | null): void => {
    if (!instance) return

    instance.geocode([bench.lat, bench.lng])
      .then(({ geoObjects }: Record<string, any>) => {
        const firstGeoObjectLocation = geoObjects
          .get(0)
          .getAddressLine() as string

        const newBench = {
          ...bench,
          address: firstGeoObjectLocation
        }

        setBench(newBench)
      })
  }

  const setMapInstance = (instance: YMapsApi | null): void => {
    setMap(instance)
  }

  useEffect(() => {
    geoDecoding(bench, map)
  }, [map])

  return (
    <>
      <h2>Лавочка на {bench.address}</h2>
      <div className="d-f ai-c mb-30">
        <StyledSubtitle>Добавлено: 15 октября 2022</StyledSubtitle>
        <StyledSubtitle>
          Автор: <StyledSubtitleAuthor>Дмитрий</StyledSubtitleAuthor>
        </StyledSubtitle>
      </div>

      <div className="d-f ai-c fw-w mb-50">
        {
          chipData
          && chipData.map((chip) => (
            <StyledTag key={chip.id}>{chip.title}</StyledTag>
          ))
        }
      </div>

      {
        bench.images
        && bench.images.length
          ? <BenchDetailSlider images={bench.images} />
          : null
      }

      <BenchDetailMap bench={bench} setMapInstance={setMapInstance} mapSettings={mapSettings} />

      {renderComments()}

      <BenchDetailNear benches={benches.items} />

      <BenchDetailCommentReport
        isOpen={isReportDialogVisible}
        onClose={handleReportDialogVisibleClose}
        commentId={currentCommentId}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['get bench', id], getBench.bind(null, id))
  await queryClient.prefetchQuery(
    ['get comments', id],
    getComments.bind(null, id)
  )
  await queryClient.prefetchQuery('get benches', getBenches.bind(null))

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export default BenchDetail
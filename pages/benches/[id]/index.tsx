import React, { ReactElement, useState } from 'react'
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
import { BenchTagType, BenchType } from '@/app/types/bench.type'
import BenchDetailNear from '@/app/components/pages/BenchDetail/BenchDetailNear'
import { CommentType } from '@/app/types/comment.type'
import { CircularProgress, Fade } from '@mui/material'

const getBenches = async (): Promise<BenchType[]> => (
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

  const [bench, setBench] = useState<BenchType>({
    id: '',
    images: [],
    is_active: false,
    lat: 0,
    lng: 0,
    owner_id: '',
    tags: []
  })

  const [comments, setComments] = useState<CommentType[]>([{
    author_id: '',
    bench_id: '',
    content: '',
    nested_comments: [],
    parent_id: '',
    id: ''
  }])

  const [benches, setBenches] = useState<BenchType[] | []>([])

  const [chipData, setChipData] = useState<BenchTagType[] | []>([])

  const benchQuery = useQuery<BenchType, ErrorType>(
    ['get bench', benchId],
    getBench.bind(null, benchId), {
      onSuccess: (response) => {
        if (response) {
          setBench(response)

          setChipData(response.tags)
        }
      },
      enabled: benchId.length > 0,
      staleTime: Infinity
    })

  const commentQuery = useQuery<CommentType[], ErrorType>(
    ['get comments', benchId],
    getComments.bind(null, benchId), 
    {
      onSuccess: (response) => {
        setComments(response)
      },
      enabled: benchId.length > 0,
    })

  useQuery<BenchType[], ErrorType>(
    'get benches',
    getBenches.bind(null),
    {
      onSuccess: (response) => {
        setBenches(response)
      },
    })

  const handleUpdateData = async (): Promise<void> => {
    await benchQuery.refetch()
    await commentQuery.refetch()
  }

  const renderComments = (): ReactElement => {
    if (commentQuery.isLoading) {
      return (
        <Fade
          in={commentQuery.isLoading}
          style={{
            transitionDelay: commentQuery.isLoading ? '800ms' : '0ms',
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
      />
    )
  }

  return (
    <>
      <h2>Лавочка на Октябрьской</h2>
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
          : <></>
      }

      <BenchDetailMap bench={bench} />
      {renderComments()}
      <BenchDetailNear benches={benches} />
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
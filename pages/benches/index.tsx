import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { StyledBenchesPage } from '@/app/components/pages/Benches/BenchesPage.style'
import BenchesSidebar from
  '@/app/components/pages/Benches/BenchesSidebar/BenchesSidebar'
import { GetStaticProps, NextPage } from 'next'
import BenchesSort from '@/app/components/pages/Benches/BenchesSort/BenchesSort'
import { StyledContent }
  from '@/app/components/pages/Benches/BenchesSidebar/BenchesSidebar.styles'
import BenchCard
  from '@/app/components/Common/ui/Bench/BenchCard/BenchCard'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import BenchService from '@/app/services/Bench/BenchService'
import TagService from '@/app/services/Tag/TagService'
import { ErrorType } from '@/app/types/common.type'
import {
  BenchTagType,
  BenchesResponseType,
  BenchesParamsType
} from '@/app/types/bench.type'
import { Pagination } from '@mui/material'
import { scrollToTop } from '@/app/utils/scrollToTop'
import { benchesDefaultParams, benchesParamsInitialState } from '@/app/components/pages/Benches/BenchesPage.constant'
import { BenchCardSkeleton } from '@/app/components/Common/ui/Bench/BenchCard/BenchCardSkeleton/BenchCardSkeleton'

const getBenches = async (
  params?: Partial<BenchesParamsType>
): Promise<BenchesResponseType> => await BenchService.getAll(params)

const getTags = async (): Promise<BenchTagType[]> => await TagService.getAll()

const BenchesPage: NextPage = (): ReactElement => {
  const [benches, setBenches] = useState<BenchesResponseType>({} as BenchesResponseType)
  const [tags, setTags] = useState<BenchTagType[]>([])
  const [benchesParams, setBenchesParams] = useState<Partial<BenchesParamsType>>(benchesParamsInitialState)

  const { refetch, isFetching } = useQuery<BenchesResponseType>(
    'get benches',
    getBenches.bind(null, benchesParams),
    {
      onSuccess: (response) => {
        setBenches(response)
      }
    })

  useQuery<BenchTagType[]>('get tags', getTags, {
    onSuccess: (response) => {
      setTags(response)
    }
  })

  const handlePageChange = (event: ChangeEvent<unknown>, value: number): void => {
    setBenches({} as BenchesResponseType)

    setBenchesParams({
      ...benchesParams,
      page: value,
    })

    scrollToTop()
  }

  useEffect(() => {
    refetch()
  }, [benchesParams.page])

  return (
    <StyledBenchesPage>
      <div className="d-f flex-end mb-40">
        <h2 className="mr-40 mb-0">Все лавочки</h2>
      </div>
      <div className="d-f">
        <BenchesSidebar tags={tags} />

        <div className={'mt-42'}>
          <BenchesSort />
          <StyledContent className={'mb-24'}>
            {
              !isFetching && benches?.items?.length
                ? (
                  benches.items.map((bench) => (
                    <BenchCard key={bench.id} bench={bench} />)
                  )
                )
                : (
                  [...Array(15)].map((_, index) => (
                    <BenchCardSkeleton key={index} isBenchFetching={isFetching} />
                  ))
                )
            }
          </StyledContent>

          <Pagination
            count={3}
            page={benchesParams.page}
            showFirstButton
            showLastButton 
            onChange={handlePageChange}
          />
        </div>
      </div>
    </StyledBenchesPage>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient
    .prefetchQuery<BenchesResponseType, ErrorType>('get benches', getBenches.bind(null, benchesDefaultParams))
  await queryClient.prefetchQuery<BenchTagType[], ErrorType>('get tags', getTags)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default BenchesPage
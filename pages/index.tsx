import { GetStaticProps, NextPage } from 'next'
import { ReactElement, useState } from 'react'
import HomeMap from '@/app/components/pages/Home/HomeMap'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import BenchService from '@/app/services/Bench/BenchService'
import HomeBenches from '@/app/components/pages/Home/HomeBenches'
import { ErrorType } from '@/app/types/common.type'
import { BenchType } from '@/app/types/bench.type'

const getBenches = async (): Promise<BenchType[]> => await BenchService.getAll()

const HomePage: NextPage = (): ReactElement => {
  const [benches, setBenches] = useState<BenchType[] | []>([])

  useQuery<BenchType[], ErrorType>('get benches', getBenches, {
    onSuccess: (response) => {
      setBenches(response)
    }
  })

  return (
    <>
      <HomeMap benches={ benches } />
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
import { Metadata } from 'next'
import styles from '@/styles/pages/bench.module.scss'
import { BenchSlider } from '@/components/pages/bench/bench-slider'
import { BenchMap } from '@/components/pages/bench/bench-map'
import { Button, Icon } from '@/components/shared'
import Link from 'next/link'
import { BenchTypes } from '@/shared/types/bench'
import { BENCHES_MOCK_DATA } from '@/shared/mocks/benches'
import { BenchComments } from '@/components/pages/bench/bench-comments'
import { BenchBack } from '@/components/pages/bench/bench-back'
import { TagsList } from '@/components/entities/tag'
import { dehydrate, useQuery } from '@tanstack/react-query'
import { benchesApi } from '@/shared/api/benches'
import { getQueryClient } from '@/shared/lib/utils'
import { Hydrate } from '@/components/shared/hydrate'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: 'Детальная лавочка',
  openGraph: {
    title: 'Детальная лавочка',
  },
}

export default async function DetailBench({ params }: Props) {
  const client = getQueryClient()

  // const bench = BENCHES_MOCK_DATA.items.find((_bench) => params.id === _bench.id)
  // const bench = BENCHES_MOCK_DATA.items[0]

  await client.prefetchQuery({
    queryKey: ['benches'],
    queryFn: async () => await benchesApi.getOne(params.id),
  })

  const data = await client.fetchQuery({
    queryKey: ['benches'],
    queryFn: async () => await benchesApi.getOne(params.id),
  })

  const dehydratedState = dehydrate(client, {
    shouldDehydrateQuery: () => true,
  })

  return (
    <Hydrate state={dehydratedState}>
      <div className={styles['bench-page']}>
        <div className={'container'}>
          <div className={styles['bench-page__header']}>
            <h1>Лавочка №1</h1>

            <BenchBack />
          </div>


          <div className={styles['bench-page__create-info']}>
            <p>Добавлено: 15 октября 2022</p>

            <p>Автор: Дмитрий</p>
          </div>

          <TagsList />

          <div className={styles['bench-page__content']}>
            <BenchSlider images={data.images} />

            {/* DEBT: Вынести за границы контейнера */}
            <BenchMap />

            {/* DEBT: Скрыто. Перенесено на MVP2 */}
            {/*<BenchComments />*/}
          </div>
        </div>
      </div>
    </Hydrate>
  )
}

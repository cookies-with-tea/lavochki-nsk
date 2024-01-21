import styles from '@/styles/pages/home-page.module.scss'
import { YandexMap } from '@/components/widgets/map'
import { LatestBenches } from '@/components/pages/home/latest-benches'
import { Metadata } from 'next'
import cn from 'classnames'
import { dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/shared/lib/utils'
import { Hydrate } from '@/components/shared/hydrate'
import { benchesApi } from '@/shared/api/benches'

export const metadata: Metadata = {
  title: 'Главная',
  openGraph: {
    title: 'Главная',
  },
}

export default async function Home() {
  const client = getQueryClient()

  await client.prefetchQuery({
    queryKey: ['benches'],
    queryFn: async () => await benchesApi.getAll(),
  })

  const data = await client.fetchQuery({
    queryKey: ['benches'],
    queryFn: async () => await benchesApi.getAll(),
  })

  const dehydratedState = dehydrate(client, {
    shouldDehydrateQuery: () => true,
  })

  return (
    <Hydrate state={dehydratedState}>
      <div className={cn(styles['home-page'])}>
        <div className={'container'}>
          <h1>
            Расположение лавочек
          </h1>
        </div>

        <YandexMap benches={data.items} className={'container'} />

        <div className={'container'}>
          <LatestBenches />
        </div>
      </div>
    </Hydrate>
  )
}

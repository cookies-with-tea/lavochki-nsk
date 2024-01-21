import styles from '@/app/benches/benches.module.scss'
import { AllBenchesSort } from '@/components/pages/benches/all-benches-sort'
import { Metadata } from 'next'
import { AllBenchesFilters } from '@/components/pages/benches/all-benches-filters'
import { getQueryClient } from '@/shared/lib/utils'
import { benchesApi } from '@/shared/api/benches'
import { dehydrate } from '@tanstack/react-query'
import { Hydrate } from '@/components/shared/hydrate'
import { BenchesWithPagination } from '@/app/benches/ui'

export const metadata: Metadata = {
  title: 'Все лавочки',
  openGraph: {
    title: 'Все лавочки',
  },
}

export default async function BenchesPage() {
  const client = getQueryClient()

  await client.prefetchQuery({
    queryKey: ['benches-all'],
    queryFn: async () => await benchesApi.getAll(),
  })

  const dehydratedState = dehydrate(client, {
    shouldDehydrateQuery: () => true,
  })

  return (
    <Hydrate state={dehydratedState}>
      <div className={styles['benches-page']}>
        <div className={'container'}>
          <div className={styles['benches-page__header']}>
            <div className={styles['benches-page__header-top']}>
              <h1 className={styles['benches-page__title']}>
                Все лавочки
              </h1>

              {/* DEBT: Узнать что будет происходить */}
              {/*<Button appearance={'link-underline'}>Показать на карте</Button>*/}
            </div>
          </div>

          <div className={styles['benches-page__content']}>
            <AllBenchesFilters />

            <div className={styles['benches-page__benches-content']}>
              <AllBenchesSort />

              <BenchesWithPagination />
            </div>
          </div>
        </div>
      </div>
    </Hydrate>
  )
}

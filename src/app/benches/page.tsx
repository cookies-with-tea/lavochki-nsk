'use client'

// TODO: Избавиться от этого безобразия

import { Button, Pagination } from '@/components/shared'
import styles from '@/styles/pages/benches.module.scss'
import { AllBenchesSort } from '@/components/pages/benches/all-benches-sort'
import { BENCHES_MOCK_DATA } from '@/shared/mocks/benches'
import { BenchCard } from '@/components/pages/benches/bench'
import { Metadata } from 'next'
import { AllBenchesFilters } from '@/components/pages/benches/all-benches-filters'
import { CommonTypes } from '@/shared/types/common'
import { useEffect, useState } from 'react'

// export const metadata: Metadata = {
//   title: 'Все лавочки',
//   openGraph: {
//     title: 'Все лавочки',
//   },
// }

export default function BenchesPage() {
  const paginationData = {
    count: 10,
    count_all_pages: 1,
    current_page: 1,
    per_page: 10
  }

  const [pagination, setPagination] = useState<Partial<CommonTypes.Pagination>>({
    page: 1,
  })

  const handlePageChange = (page: number) => {
    setPagination({
      ...pagination,
      page,
    })
  }

  // TODO: Избавиться от этого безобразия
  useEffect(() => {
    setPagination({
      total: paginationData.count,
      countPages: paginationData.count_all_pages,
      page: paginationData.current_page,
      perPage: paginationData.per_page,
    })
  }, [])

  const benchesList = BENCHES_MOCK_DATA.items.map((bench) => (
    <BenchCard key={bench.id} bench={bench} />
  ))

  return (
    <div className={styles['benches-page']}>
      <div className={'container'}>
        <div className={styles['benches-page__header']}>
          <div className={styles['benches-page__header-top']}>
            <h1 className={styles['benches-page__title']}>
              Все лавочки
            </h1>

            <Button appearance={'link-underline'}>Показать на карте</Button>
          </div>
        </div>

        <div className={styles['benches-page__content']}>
          <AllBenchesFilters />

          <div className={styles['benches-page__benches-content']}>
            <AllBenchesSort />

            <div className={styles['benches-page__list']}>
              { benchesList }
            </div>

            <Pagination page={pagination.page} total={pagination.total} onChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

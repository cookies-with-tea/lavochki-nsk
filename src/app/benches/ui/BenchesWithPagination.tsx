'use client'

import styles from '@/app/benches/benches.module.scss'
import { BenchCard } from '@/components/entities/bench'
import { useBenches } from '@/app/benches/store'
import { CommonTypes } from '@/shared/types/common'
import { Pagination } from '@/components/shared'
import { useState } from 'react'

export const BenchesWithPagination = () => {
  const { data } = useBenches()

  const [pagination, setPagination] = useState<Partial<CommonTypes.Pagination>>({
    page: data.pagination.current_page ?? 1,
    perPage: data.pagination.per_page ?? 10,
    countPages: data.pagination.count_all_pages ?? 100,
    total: data.pagination.count ?? 1000,
  })

  const benchesList = data?.items.map((bench) => (
    <BenchCard key={bench.id} bench={bench} />
  ))

  const handlePageChange = (event: any, page: number) => {
    setPagination({
      ...pagination,
      page,
    })
  }

  return (
    <div>
      <div className={styles['benches-page__list']}>
        {benchesList}
      </div>

      <Pagination
        showFirstButton
        showLastButton
        page={pagination.page}
        countPages={pagination.countPages}
        total={pagination.total}
        onChange={handlePageChange}
      />
    </div>
  )
}

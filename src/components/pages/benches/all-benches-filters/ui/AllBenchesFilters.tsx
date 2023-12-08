'use client'

import { FiltersDistricts } from '@/components/pages/benches/all-benches-filters/filters-districts'
import { FiltersDate } from '@/components/pages/benches/all-benches-filters/filters-date'
import { FiltersTags } from '@/components/pages/benches/all-benches-filters/filters-tags'

import styles from './style.module.scss'

export const AllBenchesFilters = () => {
  return (
    <aside className={styles['all-benches-filters']}>
      <FiltersDate />

      <FiltersDistricts />

      <FiltersTags />
    </aside>
  )
}

'use client'

import { FiltersDistricts } from '@/components/pages/benches/all-benches-filters/filters-districts'
import { FiltersDate } from '@/components/pages/benches/all-benches-filters/filters-date'
import { FiltersTags } from '@/components/pages/benches/all-benches-filters/filters-tags'

import styles from './style.module.scss'
import { useScreen } from '@/shared/lib/hooks'
import { Icon } from '@/components/shared'

export const AllBenchesFilters = () => {
  const { isMobileOrTablet } = useScreen()

  return (
    <>
      { !isMobileOrTablet ? (
        <aside className={styles['all-benches-filters']}>
          <FiltersDate />

          <FiltersDistricts />

          <FiltersTags />
        </aside>
      ) : null
        // DEBT: Надо добавить Drawer список для фильтров.
        // <div className={styles['all-benches-mobile-filters']}>
        //   <Icon name={'filter'} />
        // </div>
      }
    </>
  )
}

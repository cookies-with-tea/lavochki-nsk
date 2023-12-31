'use client'

import { useState } from 'react'
import { allBenchesSort } from '../config'
import { Icon } from '@/components/shared'
import styles from './style.module.scss'
import { useScreen } from '@/shared/lib/hooks/use-screen'

const setOrder = (currentSort: string): string => {
  switch (currentSort) {
    case 'desc': {
      return ''
    }

    case 'asc': {
      return 'desc'
    }

    default: {
      return 'asc'
    }
  }
}

export const AllBenchesSort = () => {
  const { isMobileOrTablet } = useScreen()

  const [sort, setSort] = useState(allBenchesSort)

  const handleChangeSort = (sortId: number) => {
    const newSort = sort.map((item) => {
      if (item.id === sortId) {
        const newOrder = setOrder(item.order)

        return { ...item, order: newOrder }
      }

      return { ...item, order: '' }
    })

    setSort(newSort)
  }

  return (
    <>
      {
       !isMobileOrTablet ? (
         <div className={styles['all-benches-sort']}>
           <p className={styles['all-benches-sort__title']}>
             Сортировать по:
           </p>

           <nav>
             <ul className={styles['all-benches-sort__list']}>
               {sort.map((item) => (
                 <li
                   className={styles['all-benches-sort__item']}
                   key={item.id}
                   onClick={handleChangeSort.bind(null, item.id)}
                 >
                   {item.label}

                   {
                     item.order !== ''
                     && (
                       <Icon
                         name="sort-arrow"
                         width={9}
                         height={14}
                         reversed={item.order === 'desc'}
                       />
                     )
                   }
                 </li>
               ))}
             </ul>
           </nav>
         </div>
       ) : null
        // DEBT: Надо добавить Select список для сортировки.
         // (
       //   <div className={styles['all-benches-mobile-sort']}>Сортировка</div>
       // )
      }
    </>
  )
}

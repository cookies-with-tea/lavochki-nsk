'use client'

import { ReactNode } from 'react'
import cn from 'classnames'
import cb from 'classnames/bind'
import styles from './styles.module.scss'
import { IPaginationProps } from '@/components/shared/pagination/interfaces'

const cx = cb.bind(styles)

// const generateAriaLabel = () => {
//
// }

export const Pagination = (props: IPaginationProps) => {
  const { page, total, onChange } = props

  const paginationPages = [...Array(total).keys()].map((_page) => {
    const index = ++_page
    const isPageActive = page === index

    return (
      <li
        aria-current={isPageActive}
        aria-label={`page ${index}`}
        tabIndex={0}
        key={index}
        className={cn(cx(styles['pagination__page'], { active: isPageActive }))}
      >
        <button type={'button'} onClick={() => onChange(index)}>
          { index }
        </button>
      </li>
    )
  })

  return (
    <div className={styles['pagination']}>
      <nav className={styles['pagination__content']}>
        <button type={'button'}>
          {'<'}
        </button>

        <ul className={styles['pagination__pages']}>
          { paginationPages }
        </ul>

        <button type={'button'}>
          {'>'}
        </button>
      </nav>
    </div>
  )
}

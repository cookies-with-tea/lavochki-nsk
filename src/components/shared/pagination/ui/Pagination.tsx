'use client'

import cn from 'classnames'
import cb from 'classnames/bind'
import styles from './styles.module.scss'
import { IPaginationProps } from '@/components/shared/pagination/interfaces'
import { usePagination } from '@/components/shared/pagination/hooks/usePagination'
import { PaginationItem } from '../pagination-item'
import { useScreen } from '@/shared/lib/hooks'

const cx = cb.bind(styles)

// DEBT: Сделать генерация aria-label
function getItemAriaLabel(type, page, selected) {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`
  }
  return `Go to ${type} page`
}

export const Pagination = (props: IPaginationProps) => {
  const { size } = props
  const { isMobile } = useScreen()

  const _size = size ?? isMobile ? 'xs' : 'md'

  const { items } = usePagination({ ...props })

  const paginationPages = items.map((item, index) => {
    return (
      // @ts-ignore
      // DEBT: Исправить типы
      <li
        aria-label={getItemAriaLabel(item.type, item.page, item.selected)}
        tabIndex={0}
        key={index}
        className={cn(cx(styles['pagination__page']))}
        {...item}
      >
        <PaginationItem {...item} />
      </li>
    )
  })

  const classes = cn('pagination', cx(
    'pagination',
    `pagination--${_size}`
    )
  )

  return (
    <div className={classes}>
      <nav className={styles['pagination__content']}>
        <ul className={styles['pagination__pages']}>
          { paginationPages }
        </ul>
      </nav>
    </div>
  )
}

import styles from '@/components/shared/badge/ui/style.module.scss'
import cn from 'classnames'
import cb from 'classnames/bind'
import { ReactNode } from 'react'

interface IBadgeProps {
  children: ReactNode
  content: string | number
  hidden?: boolean
  max?: number
  size?: 'md' | 'sm' | 'xs'
}

const cx = cb.bind(styles)

export const Badge = ({
  hidden = false,
  size = 'sm',
  children,
  content
}: IBadgeProps) => {
  return (
    <div className={cn('badge', cx('badge', `badge--${size}`))}>
      { !hidden && <span className={cx('badge__content')}>{content}</span> }

      { children }
    </div>
  )
}

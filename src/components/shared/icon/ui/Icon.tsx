'use client'

import cn from 'classnames'
import cb from 'classnames/bind'
import styles from '@/components/shared/icon/ui/styles.module.scss'

interface IIconProps {
  name: string
  className?: string
  reversed?: boolean
}

const cx = cb.bind(styles)

export const Icon = ({ className = '', reversed = false, name }: IIconProps) => {
  const classNames = cn(
    'base-icon',
    cx(
      'base-icon',
      `base-icon--${name}`,
      { reversed }
    ),
    className
  )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames}
      aria-hidden="true"
      width={'1em'}
      height={'1em'}
    >
      <use xlinkHref={`#${name}`} href={`#${name}`} />
    </svg>
  )
}

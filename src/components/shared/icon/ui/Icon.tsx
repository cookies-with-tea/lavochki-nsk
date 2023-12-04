'use client'

import cn from 'classnames'
import cb from 'classnames/bind'
import styles from '@/components/shared/icon/ui/styles.module.scss'

interface IIconProps {
  name: string
  className?: string
  reversed?: boolean
  width?: string | number
  height?: string | number
}

const cx = cb.bind(styles)

export const Icon = ({
   className = '',
   reversed = false,
   name,
   width = '1em',
   height = '1em'
}: IIconProps) => {
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
      width={width}
      height={height}
    >
      <use xlinkHref={`#${name}`} href={`#${name}`} />
    </svg>
  )
}

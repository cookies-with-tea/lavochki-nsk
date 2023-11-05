'use client'

import { cl } from '@/shared/lib/utils'

interface IIconProps {
  name: string
  className?: string
  reversed?: boolean
}

import styles from '@/components/shared/icon/ui/styles.module.scss'

export const BaseIcon = ({ className = '', reversed = false, name }: IIconProps) => {
  const classNames = cl({
    path: styles,
    classNames: ['base-icon', `base-icon--${name}`, { reversed }],
    additionalClasses: className,
    baseClassName: 'base-icon',
  })

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

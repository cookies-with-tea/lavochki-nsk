import Link from 'next/link'
import { LinkProps } from 'next/dist/client/link'
import { ReactNode } from 'react'
import { cl } from '@/shared/lib/utils'
import styles from '@/components/shared/button-link/ui/styles.module.scss'

type ButtonLinkProps = {
  children: ReactNode
  size?: 'md' | 'sm' | 'xs'
  className?: string
} & LinkProps

export const ButtonLink = (props: ButtonLinkProps) => {
  const { size = 'md', children, className } = props
  const copiedProps = { ...props }

  delete copiedProps.children
  delete copiedProps.size

  const classNames = cl({
    path: styles,
    classNames: [
      'button-link',
      `button-link--${size}`,
    ],
    baseClassName: 'button-link',
    additionalClasses: className
  })

  return (
    <Link {...copiedProps} className={classNames}>
      { children }
    </Link>
  )
}

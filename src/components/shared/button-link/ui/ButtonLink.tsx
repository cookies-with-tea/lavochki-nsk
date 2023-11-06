import Link from 'next/link'
import { LinkProps } from 'next/dist/client/link'
import { ReactNode } from 'react'
import styles from '@/components/shared/button-link/ui/styles.module.scss'
import cn from 'classnames'
import cb from 'classnames/bind'

type ButtonLinkProps = {
  children: ReactNode
  size?: 'md' | 'sm' | 'xs'
  className?: string
} & LinkProps

const cx = cb.bind(styles)

export const ButtonLink = (props: ButtonLinkProps) => {
  const { size = 'md', children, className } = props
  const copiedProps = { ...props }

  delete copiedProps.children
  delete copiedProps.size

  const classNames = cn(cx(
    'button-link',
    `button-link--${size}`,
  ), className)

  return (
    <Link {...copiedProps} className={classNames}>
      { children }
    </Link>
  )
}

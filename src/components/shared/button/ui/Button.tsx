import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import cb from 'classnames/bind'

import styles from '@/components/shared/button/ui/styles.module.scss'

const cx = cb.bind(styles)

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'md' | 'sm' | 'xs'
  appearance?: 'primary' | 'secondary'
  icon?: ReactElement
  children?: ReactNode
}

export const Button = (props: IButtonProps) => {
  const {
    size = 'sm',
    appearance = 'primary',
    className = '',
    type = 'button',
    icon,
    children
  } = props

  const formattedProps = { ...props }

  delete formattedProps.icon

  const classNames = cn('base-button', cx(
    'base-button',
    `base-button--${size}`,
    `base-button--${appearance}`,
    { 'icon-only': icon && !props.children }
  ), className)

  return (
    <button {...formattedProps} className={classNames} type={type}>
      { icon ? icon : null }
      { children ? children : null }
    </button>
  )
}

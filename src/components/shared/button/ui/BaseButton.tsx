import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'

import { cl } from '@/shared/lib/utils'
import styles from '@/components/shared/button/ui/styles.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<any> {
  size?: 'md' | 'sm' | 'xs'
  appearance?: 'primary' | 'secondary'
  icon?: ReactElement
  children?: ReactNode
}

export const BaseButton = (props: IButtonProps) => {
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

  const classNames = cl({
    path: styles,
    classNames: [
      'base-button',
      `base-button--${size}`,
      `base-button--${appearance}`,
      { 'icon-only': icon && !children }
    ],
    baseClassName: 'base-button',
    additionalClasses: className
  })

  return (
    <button {...formattedProps} className={classNames} type={type}>
      { icon ? icon : null }
      { children ? children : null }
    </button>
  )
}

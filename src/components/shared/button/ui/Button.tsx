import { ComponentProps, ElementType, forwardRef, ReactElement, ReactNode, Ref } from 'react'
import cn from 'classnames'
import cb from 'classnames/bind'
import styles from './styles.module.scss'
import Link from 'next/link'

const cx = cb.bind(styles)

interface ButtonOwnProps<E extends ElementType = ElementType> {
	size?: 'md' | 'sm' | 'xs'
	appearance?: 'primary' | 'secondary' | 'link' | 'link-underline' | 'dashed'
	icon?: ReactElement
  prefixIcon?: ReactElement
  suffixIcon?: ReactElement
	children?: ReactNode
	as?: E | typeof Link
}

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
	Omit<ComponentProps<E>, keyof ButtonOwnProps>

const defaultElement = 'button'

const InnerButton  = <E extends ElementType = typeof defaultElement>(
  props: ButtonProps<E>,
  ref?: Ref<E> | null
) => {
  const {
    size = 'md',
    appearance = 'primary',
    className = '',
    icon,
    as,
    children,
    prefixIcon,
    suffixIcon,
    ...restProps
  } = props

  const TagName = as || defaultElement

  const typeProp = TagName === 'button' ? { type: 'button' } : {}

  const formattedProps = {
    ...restProps,
    ...typeProp,
  }

  const classNames = cn('base-button', cx(
    'base-button',
    `base-button--${size}`,
    `base-button--${appearance}`,
    { 'icon-only': icon && !children }
  ), className)

  return (
    <TagName {...formattedProps} className={classNames} ref={ref}>
      { icon && !children && icon }

      { prefixIcon && (
        <div className={cn('base-button__prefix-icon', cx('base-button__prefix-icon'))}>
          { prefixIcon }
        </div>
      ) }

      <span className={cn('base-button__content')}>
        { children && children }
      </span>

      { suffixIcon && (
        <div className={cn('base-button__suffix-icon', cx('base-button__suffix-icon'))}>
          { suffixIcon }
        </div>
      ) }
    </TagName>
  )
}

// TODO: Типизировать.
export const Button = forwardRef<any, any>(InnerButton)

export default Button

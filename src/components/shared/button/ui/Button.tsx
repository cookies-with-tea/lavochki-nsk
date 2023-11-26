import { ComponentProps, ElementType, ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import cb from 'classnames/bind'

import styles from '@/components/shared/button/ui/styles.module.scss'
import Link from 'next/link'

const cx = cb.bind(styles)

interface ButtonOwnProps<E extends ElementType = ElementType> {
	size?: 'md' | 'sm' | 'xs'
	className?: string
	appearance?: 'primary' | 'secondary' | 'link' | 'link-underline'
	icon?: ReactElement
	children?: ReactNode
	as?: E | typeof Link
}

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
	Omit<ComponentProps<E>, keyof ButtonOwnProps>

const defaultElement = 'button'

export const Button = <E extends ElementType = typeof defaultElement>(
	props: ButtonProps<E>
) => {
	const {
		size = 'sm',
		appearance = 'primary',
		className = '',
		icon,
		as,
		children,
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
  <TagName {...formattedProps} className={classNames}>
    { icon && !children && icon }

    { children && children }
  </TagName>
	)
}

import { ButtonHTMLAttributes } from 'react'

import { cl } from '@/shared/lib/utils'
import styles from '@/components/shared/button/ui/styles.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<any> {
  size?: 'md' | 'sm'
  appearance?: 'primary' | 'secondary'
}

export const BaseButton = (props: IButtonProps) => {
  const {
    size = 'md',
    appearance = 'primary'
  } = props

  const classNames = cl({
    path: styles,
    classNames: [
      'base-button',
      `base-button--${size}`,
      `base-button--${appearance}`
    ],
    additionalClasses: 'base-button'
  })

  return (
	<button className={classNames} type={'button'} {...props}>
		{props.children}
	</button>
  )
}

import { Button, ButtonProps, ElementProps } from '@mantine/core'
import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from './styles.module.scss'
const cx = cnBind.bind(styles)

interface MyButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
  as?: 'text' | 'button'
  appearance?: 'primary' | 'success' | 'danger'
}

export const UiButton = (props: MyButtonProps) => {
  const { as = 'button', appearance = 'primary', ...restProps } = props

  const classes = cn('ui-button', cx('ui-button', `ui-button--${as}`, `ui-button--${appearance}`))

  return (
    <Button className={classes} {...restProps}>
      {props.children}
    </Button>
  )
}

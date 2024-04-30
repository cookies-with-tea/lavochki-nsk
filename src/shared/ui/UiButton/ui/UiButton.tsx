import { Button, ButtonProps, ElementProps } from '@mantine/core'
import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from './styles.module.scss'

const cx = cnBind.bind(styles)

interface IUiButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
  as?: 'text' | 'button'
  appearance?: 'primary' | 'success' | 'danger'
}

export const UiButton = (props: IUiButtonProps) => {
  const { as = 'button', appearance = 'primary', className, ...restProps } = props

  const classes = cn('ui-button', cx('ui-button', `ui-button--${as}`, `ui-button--${appearance}`), className)

  return (
    <Button className={classes} {...restProps}>
      {props.children}
    </Button>
  )
}

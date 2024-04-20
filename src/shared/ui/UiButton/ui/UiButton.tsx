import { Button, ButtonProps, ElementProps } from '@mantine/core'

import styles from './styles.module.scss'

// interface MyButtonProps
//   extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
//   h: number
// }

export const UiButton = (props: ElementProps<'button'>) => {
  return (
    <Button className={styles['ui-button']} {...props}>
      {props.children}
    </Button>
  )
}

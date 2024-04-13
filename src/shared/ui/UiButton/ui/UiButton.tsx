import { Button, ButtonProps } from '@mantine/core'

import styles from './styles.module.scss'

export const UiButton = (props: ButtonProps) => {
  return (
    <Button className={styles['ui-button']} {...props}>
      {props.children}
    </Button>
  )
}

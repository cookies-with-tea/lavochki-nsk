import { Drawer, DrawerProps } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'

import { SIcon } from 'shared/ui'
import styles from 'shared/ui/s-drawer/ui/styles.module.scss'

const cx = cnBind.bind(styles)

export const SDrawer = (props: DrawerProps) => {
  return (
    <Drawer
      className={cn(cx('s-drawer'))}
      closeIcon={<SIcon name={'close'} />}
      closable={false}
      {...props}
    >
      { props.children }
    </Drawer>
  )
}
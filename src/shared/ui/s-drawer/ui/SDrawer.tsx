import { Drawer } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { ReactNode } from 'react'

import { SIcon } from 'shared/ui'
import styles from 'shared/ui/s-drawer/ui/styles.module.scss'

interface IProps {
  children: ReactNode
  open: boolean
  closable?: boolean
  onClose?: () => void
}

const cx = cnBind.bind(styles)

export const SDrawer = ({ children, open, closable = false, onClose }: IProps) => {
  return (
    <Drawer
      className={cn(cx('s-drawer'))}
      open={open}
      closable={closable}
      closeIcon={<SIcon name={'close'} />}
      onClose={onClose}
    >
      { children }
    </Drawer>
  )
}
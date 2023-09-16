import { Badge } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { useState } from 'react'

import styles from 'widgets/w-header/ui/styles.module.scss'

import { SDrawer, SIcon } from 'shared/ui'

const cx = cnBind.bind(styles)

export const HeaderNotifications = () => {
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false)

  return (
    <>
      <button className={cn(cx(('w-header__notifications')))} onClick={() => setIsNotificationsVisible(true)}>
        <Badge count={5}>
          <SIcon name={'notifications'} />
        </Badge>
      </button>

      <SDrawer open={isNotificationsVisible} onClose={() => setIsNotificationsVisible(false)}>
        Notifications
      </SDrawer>
    </>
  )
}
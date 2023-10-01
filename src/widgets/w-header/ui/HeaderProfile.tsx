import { Avatar } from 'antd'
import cn from 'classnames'
import cnBind from 'classnames/bind'

import EmptyAvatar from '/empty-avatar.png'

import { useUnit } from 'effector-react'
import { useState } from 'react'

import styles from 'widgets/w-header/ui/styles.module.scss'

import { logoutFx } from 'features/f-telegram-auth/model/login'

import { selectors } from 'entities/user'

import { SButton, SDrawer } from 'shared/ui'

const cx = cnBind.bind(styles)

// TODO: Avatar вынести в отдельный компонент картинки

export const HeaderProfile = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(false)
  const user = useUnit(selectors.user)

  const src = undefined // TODO: Получить данное поле из user
  // const user = {
  //   name: 'Олег',
  //   src: 'https://photo.com/user.png'
  // }

  return (
    <>
      <div className={cn(cx('header-profile'))}>
        <span className={cn(cx('header-profile__text'))}> { user?.username } </span>

        <button className={cn(cx('header-profile__button'))} onClick={() => setIsProfileVisible(!isProfileVisible)}>
          { src ? <Avatar src={src} /> : <img src={EmptyAvatar} />}
        </button>
      </div>


      <SDrawer open={isProfileVisible} onClose={() => setIsProfileVisible(false)}>
        Profile

        <SButton appearance={'dashed'} onClick={logoutFx}>
          Выйти
        </SButton>
      </SDrawer>
    </>
  )
}

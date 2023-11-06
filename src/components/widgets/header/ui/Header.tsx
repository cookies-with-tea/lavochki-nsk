import styles from '@/components/widgets/header/ui/styles.module.scss'

import cb from 'classnames/bind'
import { Icon, ButtonLink, Badge } from '@/components/shared'
import { HeaderProfile } from '@/components/widgets/header/ui/HeaderProfile'
import { TelegramAuth } from '@/components/features/telegram-auth'

const cx = cb.bind(styles)

export const Header = () => {
  const isAuth = true

  return (
    <header className={cx('header')}>
      <div className={cx('header__inner', 'container')}>
        <div className={cx('header__item')}>
          <Icon name={'logo'} />
          <ButtonLink href={'/benches'} size={'sm'}>Все лавочки</ButtonLink>
        </div>

        <div className={cx('header__item')}>
          {
            isAuth ? <TelegramAuth/> :
            <>
              <Badge />
              <HeaderProfile />
            </>
          }

        </div>
      </div>
    </header>
  )
}

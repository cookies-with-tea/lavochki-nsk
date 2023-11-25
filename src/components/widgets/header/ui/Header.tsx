import styles from '@/components/widgets/header/ui/styles.module.scss'

import cb from 'classnames/bind'
import { Icon, Badge, Button } from '@/components/shared'
import { HeaderProfile } from '@/components/widgets/header/ui/HeaderProfile'
import { TelegramAuth } from '@/components/features/telegram-auth'
import Link from 'next/link'

const cx = cb.bind(styles)

export const Header = () => {
  const isAuth = false

  return (
    <header className={cx('header')}>
      <div className={cx('header__inner', 'container')}>
        <div className={cx('header__item')}>
          <Icon name={'logo'} />
          <Button as={Link} href={'/benches'} size={'sm'}>Все лавочки</Button>
        </div>

        <div className={cx('header__item')}>
          {
            isAuth ? <TelegramAuth/> :
            <>
              <Badge content={0}>
                <Icon name={'notifications'} />
              </Badge>

              <HeaderProfile />
            </>
          }
        </div>
      </div>
    </header>
  )
}

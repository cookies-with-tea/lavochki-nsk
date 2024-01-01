'use client'

import styles from './styles.module.scss'

import cb from 'classnames/bind'
import { Icon, Badge, Button } from '@/components/shared'
import { HeaderProfile } from '@/components/widgets/header/ui/HeaderProfile/HeaderProfile'
import { TelegramAuth } from '@/components/features/telegram-auth'
import Link from 'next/link'
import { useScreen } from '@/shared/lib/hooks'

const cx = cb.bind(styles)

export const Header = () => {
  const { isMobile } = useScreen()

  const isAuth = false

  return (
    <header className={cx('header')}>
      <div className={cx('header__inner', 'container')}>
        <div className={cx('header__item')}>
          <Link href={'/'}>
            <Icon name={'logo'} />
          </Link>

          <Button as={Link} href={'/benches'} size={isMobile ? 'xs' : 'sm'} appearance={'secondary'}>Все лавочки</Button>
        </div>

        <div className={cx('header__item')}>
          {
            !isAuth ? <TelegramAuth/> :
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

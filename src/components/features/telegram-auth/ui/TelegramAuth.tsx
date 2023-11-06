'use client'

import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from '@/components/features/telegram-auth/ui/styles.module.scss'

import { Icon } from '@/components/shared'

const cx = cnBind.bind(styles)

export const TelegramAuth = () => {
  const handleLogin = (): void => {
    window?.Telegram?.Login.auth({
      bot_id: process.env.BOT_ID,
      request_access: true
    },
    async (data: any) => {
      console.log(data)
    })
  }

  return (
    <button className={cn(cx('f-telegram-auth'), 'f-telegram-auth')} onClick={handleLogin}>
      <div className={cn(cx('f-telegram-auth__inner'))}>
        <div className={cn(cx('f-telegram-auth__text'))}>
          Войти
        </div>

        <Icon name={'telegram'} />
      </div>
    </button>
  )
}

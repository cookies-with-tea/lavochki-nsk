'use client'

import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from '@/components/features/telegram-auth/ui/styles.module.scss'

import { BaseIcon } from '@/components/shared'
import { useEffect } from 'react'

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

  useEffect(() => {
    const body = document.body

    const script = document.createElement('script')

    script.src = 'https://telegram.org/js/telegram-widget.js?27'

    script.async = true

    body.appendChild(script)
  }, [])

  return (
    <button className={cn(cx('f-telegram-auth'), 'f-telegram-auth')} onClick={handleLogin}>
      <div className={cn(cx('f-telegram-auth__inner'))}>
        <div className={cn(cx('f-telegram-auth__text'))}>
          Войти
        </div>

        <BaseIcon name={'telegram'} />
      </div>
    </button>
  )
}

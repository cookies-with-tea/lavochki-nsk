'use client'

import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from '@/components/features/telegram-auth/ui/styles.module.scss'

import { Icon } from '@/components/shared'
import { usersApi } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'
import { TelegramUserType } from '@/shared/types/telegram'

const cx = cnBind.bind(styles)

interface ITelegramAuthProps {
  onSuccess: () => void
}

export const TelegramAuth = ({ onSuccess }: ITelegramAuthProps) => {
  const mutation  = useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (payload: TelegramUserType) => await usersApi.create(payload),
    onSuccess: (response) => {
      localStorage.setItem('access', response.access)
      localStorage.setItem('refresh', response.refresh)

      onSuccess()
    }
  })

  const handleLogin = () => {
    window?.Telegram?.Login.auth({
      bot_id: process.env.BOT_ID,
      request_access: true
    },
    async (data) => {
      await mutation.mutateAsync(data)
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

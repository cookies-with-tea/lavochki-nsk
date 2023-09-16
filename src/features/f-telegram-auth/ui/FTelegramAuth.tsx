import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from 'features/f-telegram-auth/ui/styles.module.scss'

import { UserType } from 'shared/types'
import { SIcon } from 'shared/ui'

interface IProps {
  onAuth?: (user: UserType) => void
}

const cx = cnBind.bind(styles)

export const FTelegramAuth = ({ onAuth }: IProps) => {
  const handleLogin = (): void => {
    window?.Telegram?.Login.auth({
      bot_id: import.meta.env.VITE_BOT_ID,
      request_access: true
    }, 
    (data: UserType) => {
      if (onAuth) {
        onAuth(data)
      }
    })
  }

  return (
    <button onClick={handleLogin} className={cn(cx('f-telegram-auth'), 'f-telegram-auth')}>
      <div className={cn(cx('f-telegram-auth__inner'))}>
        <div className={cn(cx('f-telegram-auth__text'))}>
            Войти
        </div>

        <SIcon name={'telegram'} />
      </div>
    </button>
  )
}
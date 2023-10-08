import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from 'features/telegram-auth/ui/styles.module.scss'

import { UserTelegramType } from 'shared/types'
import { SIcon } from 'shared/ui'

import { loginUserFx } from '../model/login'

const cx = cnBind.bind(styles)

export const FTelegramAuth = () => {
  const handleLogin = (): void => {
    window?.Telegram?.Login.auth({
      bot_id: import.meta.env.VITE_BOT_ID,
      request_access: true
    },
    async (data: UserTelegramType) => {
      await loginUserFx(data)
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

import cn from 'classnames'
import cnBind from 'classnames/bind'

import { UiIcon } from '#shared/ui'

import styles from './styles.module.scss'

const cx = cnBind.bind(styles)

export const TelegramAuth = () => {
  const handleLogin = (): void => {
    window?.Telegram?.Login.auth(
      {
        bot_id: import.meta.env.VITE_BOT_ID,
        request_access: true,
      },
      async (data) => {
        // await loginUserFx(data)
        console.log(data)
      }
    )
  }

  return (
    <button className={cn(cx('telegram-auth'), 'telegram-auth')} onClick={handleLogin}>
      <div className={cx('telegram-auth__inner')}>
        <div className={cx('telegram-auth__text')}>Войти</div>

        <div className={cx('telegram-auth__icon-wrapper')}>
          <UiIcon name={'telegram'} />

          <div className={cx('telegram-auth__icon-base')} />
        </div>
      </div>
    </button>
  )
}

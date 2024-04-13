import { TelegramAuth } from '#features/telegram-auth/ui/TelegramAuth'

import styles from './styles.module.scss'

export const LoginPage = () => {
  return (
    <div className={styles['login-page']}>
      <h1 className={styles['login-page__title']}>Авторизация</h1>

      <div className={styles['login-page__form']}>
        <div className={styles['login-page__form-item']}>
          <p className={styles['login-page__form-text']}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit quo fugiat deserunt dignissimos, ad
            voluptatem dolorem sequi, quia pariatur similique totam, possimus placeat minima?
          </p>

          <TelegramAuth />
        </div>

        <div className={styles['login-page__form-item']}>
          <h2>There will be 3d graphics here</h2>
        </div>
      </div>
    </div>
  )
}

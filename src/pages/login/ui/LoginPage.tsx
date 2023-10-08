import { Space } from 'antd'

import styles from 'pages/login/ui/styles.module.scss'

import { FTelegramAuth } from 'features/telegram-auth'

export const LoginPage = () => {
  return (
    <div className={styles['login-page']}>
      <h1 className={styles['login-page__title']}>
        Авторизация
      </h1>
      <Space align={'center'} className={styles['login-page__form']}>
        <div className={styles['login-page__form-item']}>
          <p className={styles['login-page__form-text']}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Fugit quo fugiat deserunt dignissimos, ad voluptatem dolorem sequi,
            quia pariatur similique totam, possimus placeat minima?
          </p>

          <FTelegramAuth />
        </div>

        <div className={styles['login-page__form-item']}>
          <h2>There will be 3d graphics here</h2>
        </div>
      </Space>
    </div>
  )
}

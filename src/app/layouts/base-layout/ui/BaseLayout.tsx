import { Outlet } from '@tanstack/react-router'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { Suspense } from 'react'

import Header from '#widgets/header'
import { MenuMap } from '#widgets/menu-map'

import styles from './styles.module.scss'

const cx = cnBind.bind(styles)

export const BaseLayout = () => {
  return (
    <div className={cn(cx('base-layout'), 'd-flex', 'container')}>
      <div className={styles['base-layout__content']}>
        <MenuMap />

        <div className={'container'}>
          <Header />

          <main>
            <Suspense fallback={<p>Loading</p>}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

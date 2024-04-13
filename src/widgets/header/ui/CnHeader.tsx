import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from './styles.module.scss'

const cx = cnBind.bind(styles)

export const CnHeader = () => {
  return (
    <header className={cn('cn-header', cx('cn-header'))} data-tid={'cn-header'}>
      <div className={cn('ch-header__logo', cx('cn-header__logo'))}>
        Logo
      </div>
    </header>
  )
}

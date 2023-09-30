import cn from 'classnames'
import cnBind from 'classnames/bind'

import styles from 'widgets/w-header/ui/header-theme/ui/styles.module.scss'

import { SIcon } from 'shared/ui'

const cx = cnBind.bind(styles)

export const HeaderThemeToggler = () => {
  return (
    <div className={cx(cn('header-theme-toggler'))}>
      <button className={cx(cn('header-theme-toggler__button'), 'active')}>
        <SIcon name={'sun'} />
      </button>
      <button className={cx(cn('header-theme-toggler__button'))}>
        <SIcon name={'moon'}/>
      </button>
      <button className={cx(cn('header-theme-toggler__button'))}>
        <SIcon name={'system'}/>
      </button>
    </div>
  )
}
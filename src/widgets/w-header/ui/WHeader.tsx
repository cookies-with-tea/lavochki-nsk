import cn from 'classnames'
import cnBind from 'classnames/bind'

import { HeaderThemeToggler } from 'widgets/w-header/ui/header-theme/ui/HeaderThemeToggler'
import { HeaderNotifications } from 'widgets/w-header/ui/HeaderNotifications'
import { HeaderProfile } from 'widgets/w-header/ui/HeaderProfile'
import { HeaderSearch } from 'widgets/w-header/ui/HeaderSearch'
import styles from 'widgets/w-header/ui/styles.module.scss'

const cx = cnBind.bind(styles)

export const WHeader = () => {
  return (
    <header className={cn(cx(('w-header')))}>
      <div className={cn(cx(('w-header__top-section')))}>
        <HeaderThemeToggler />
      </div>

      <div className={cn(cx(('w-header__bottom-section')))}>
        <HeaderSearch />
        
        <HeaderNotifications />

        <HeaderProfile />
      </div>
    </header>
  )
}
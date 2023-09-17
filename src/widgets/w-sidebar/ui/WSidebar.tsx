import cn from 'classnames'
import cnBind from 'classnames/bind'
import { Link, useLocation } from 'react-router-dom'

import { ROUTES_MAP } from 'widgets/w-sidebar/constants/routes'
import styles from 'widgets/w-sidebar/ui/styles.module.scss'

import Logo from '/logo.png'

import { SIcon } from 'shared/ui'

const cx = cnBind.bind(styles)

export const WSidebar = () => {
  const location = useLocation()

  const getNavLinkClass = (path: string) => location.pathname === path

  return (
    <aside className={cn(cx('w-sidebar'))}>
      <Link to={'/'} className={cn(cx('w-sidebar__logo'))}>
        <div className={cn(cx('w-sidebar__logo-inner'))}>
          <img src={Logo} />

          <span>Lavochki NSK</span>
        </div>
      </Link>

      <nav>
        <ul>
          { ROUTES_MAP.map((route) => (
            <li key={route.title} className={cn(cx('w-sidebar__item', { active: getNavLinkClass(route.path) }))}>
              <Link to={route.path} className={cn(cx('w-sidebar__item-link'))}>
                <SIcon className={cn(cx('w-sidebar__item-icon'))} name={route.icon} />

                <span>
                  { route.title }
                </span>
              </Link>
            </li>
          )) }
        </ul>
      </nav>
    </aside>
  )
}
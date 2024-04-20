import { Link } from '@tanstack/react-router'
import cnBind from 'classnames/bind'

import { ROUTES_MAP } from '#widgets/menu-map/constants/routes'
import { ThemeSwitch } from '#widgets/menu-map/ui/ThemeSwitch'

import { UiIcon } from '#shared/ui'

import styles from './styles.module.scss'

const cx = cnBind.bind(styles)

export const MenuMap = () => {
  const getNavLinkClass = (path: string) => location.pathname === path

  const menuItems = ROUTES_MAP.map((route) => (
    <li key={route.title} className={cx('menu-map__item', { active: getNavLinkClass(route.path) })}>
      <Link to={route.path} className={cx('menu-map__item-link')}>
        <UiIcon className={cx('menu-map__item-icon')} name={route.icon} />

        <span>{route.title}</span>
      </Link>
    </li>
  ))

  return (
    <aside className={cx('menu-map')}>
      <Link to={'/home'} className={cx('menu-map__logo')}>
        <div className={cx('menu-map__logo-inner')}>
          <img src={'/logo.png'} alt={''} />

          <span>Lavochki NSK</span>
        </div>
      </Link>

      <nav>
        <ul>{menuItems}</ul>
      </nav>

      <ThemeSwitch />
    </aside>
  )
}

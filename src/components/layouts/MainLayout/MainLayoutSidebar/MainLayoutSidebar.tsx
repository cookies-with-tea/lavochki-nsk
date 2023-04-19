import { Link, useLocation } from 'react-router-dom'

import { menuItems } from '@/components/layouts/MainLayout/MainLayoutSidebar/MainLayoutSidebar.constant'
import { BaseIcon } from '@/shared/ui'

import logo from '@/shared/assets/images/logo.png'
import { Switch, Typography } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '@/shared/contexts'
import { StyledSidebar } from '@/components/layouts/MainLayout/MainLayoutSidebar/MainLayoutSidebar.style'

export const MainLayoutSidebar = () => {
  const location = useLocation()

  const colorMode = useContext(ThemeContext)

  const getNavLinkClass = (path: string): string => location.pathname === path
    ? 'page-active'
    : 'page-inactive'

  return (
    <StyledSidebar>
      <div className={'d-f ai-c'}>
        <div className={'sidebar__logo'}>
          <img src={logo} />
        </div>
        <Typography variant={'h4'} className={'sidebar__title'}>Lavochki <br /> Dashboard </Typography>
      </div>

      <ul className={'mt-60'}>
        {
          menuItems.map((item) => (
            <li key={item.id} className={getNavLinkClass(item.url)}>
              <Link to={item.url}>
                <BaseIcon name={item.icon} width={20} height={20} />
                {item.label}
              </Link>
            </li>
          ))
        }
      </ul>

      <Switch defaultChecked onChange={colorMode.toggleColorMode} />
    </StyledSidebar>
  )
}

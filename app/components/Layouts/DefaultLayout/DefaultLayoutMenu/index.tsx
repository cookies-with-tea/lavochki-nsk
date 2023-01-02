import React, { FC } from 'react'
import {
  StyledLink,
  StyledLogoutButton,
  StyledMenuItem
} from '@/app/components/Layouts/DefaultLayout/DefaultLayoutMenu/DefaultLayoutMenu.style'
import CommonIcon from '@/app/components/Common/CommonIcon/CommonIcon'
import { Menu } from '@mui/material'
import { menuItems }
  from 
  '@/app/components/Layouts/DefaultLayout/DefaultLayoutMenu/DefaultLayoutMenu.constants'
import Link from 'next/link'

interface IProps {
    anchorEl: null | HTMLElement
    isOpen: boolean
    onClose: () => void
    handleLogout: () => void
}

const DefaultLayoutMenu: FC<IProps> = (
  { anchorEl,
    isOpen,
    onClose,
    handleLogout
  }) => {
  return (
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      MenuListProps={{
        style: {
          padding: 0,
        },
        'aria-labelledby': 'profile-button',
      }}
      PaperProps={{
        style: {
          transform: 'translateY(33px)',
        }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      disableAutoFocusItem
    >
      { menuItems.map((item) => (
        <StyledMenuItem key={item.title}>
          <Link href={item.url as string} passHref>
            <StyledLink className="menu__link">
              <div>{item.title}</div>
              <CommonIcon
                name={item.icon}
                width={24}
                height={24}
                fillColor="#49260A"
              />
            </StyledLink>
          </Link>
        </StyledMenuItem>
      )) }
      <StyledMenuItem>
        <StyledLogoutButton className="menu__link" onClick={handleLogout}>
          <div>
            Выйти
          </div>
          <CommonIcon
            name="logout"
            width={24}
            height={24}
            fillColor="#49260A"
          />
        </StyledLogoutButton>
      </StyledMenuItem>
    </Menu>
  )
}

export default DefaultLayoutMenu
import React, { FC, ReactElement, useEffect, useState } from 'react'
import {
  StyledAvatarButton,
  StyledHeader,
  StyledHeaderWrapper,
  StyledHomeLink
} from
  '@/app/components/Layouts/DefaultLayout/DefaultLayoutHeader/DefaultLayoutHeader.type'
import Link from 'next/link'
import Profile from '@/public/Avatar.png'
import CommonIcon from '@/app/components/Common/ui/CommonIcon/CommonIcon'
import { Avatar } from '@mui/material'
import Image from 'next/image'
import { UserType } from '@/app/types/user.type'
import UserService from '@/app/services/User/UserService'
import { useMutation } from 'react-query'
import { DefaultLayoutMenu }
  from '@/app/components/Layouts/DefaultLayout/DefaultLayoutMenu/DefaultLayoutMenu'
import { DefaultLayoutHeaderAuthButton }
  from '@/app/components/Layouts/DefaultLayout/DefaultLayoutHeader/DefaultLayoutHeaderAuthButton/DefaultLayoutHeaderAuthButton'

export const DefaultLayoutHeader: FC = (): ReactElement => {
  const [isAuth, setIsAuth] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const { mutateAsync } = useMutation('registration user',
    async (data: UserType) => await UserService.create(data), {
      onSuccess: (response) => {
        localStorage.setItem('token', response.access)

        location.reload()
      }
    })

  const handleAnchorSet = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const handleTelegramResponse = async (response: UserType): Promise<void> => {
    await mutateAsync(response)
  }

  const handleLogout = (): void => {
    localStorage.clear()

    location.reload()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setIsAuth(true)
    }
  }, [])

  return (
    <StyledHeader>
      <StyledHeaderWrapper>
        <div className="d-f ai-c">
          {/* TODO: Если будет SPA, то будет ошибка */}
          {/*<Link href={'/'} passHref>*/}
          <StyledHomeLink href={'/'}>
            <CommonIcon name="logo" width={260} height={32} />
          </StyledHomeLink>
          {/*</Link>*/}
          <Link href="/benches" passHref>
            <a>Все лавочки</a>
          </Link>
        </div>
        <div className="d-f ai-c">
          <div className="d-f ai-c">
            { isAuth ? (
              <>
                <span className="text mr-12">Никита</span>
                <StyledAvatarButton
                  id="profile-button"
                  aria-controls={open ? 'profile-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleAnchorSet}
                >
                  <Avatar sx={{ width: 62, height: 62 }}>
                    <Image
                      src={Profile}
                      alt={'profile'}
                      width={'100%'}
                      height={'100%'}
                      objectFit={'cover'}
                    />
                  </Avatar>
                </StyledAvatarButton>

                <DefaultLayoutMenu
                  anchorEl={anchorEl}
                  handleLogout={handleLogout}
                  onClose={handleMenuClose}
                  isOpen={open}
                />
              </>
            ) : (
              <DefaultLayoutHeaderAuthButton onAuth={handleTelegramResponse} />
            )}
          </div>
        </div>
      </StyledHeaderWrapper>
    </StyledHeader>
  )
}

import React, {FC, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import Logo from '@/public/icons/logo.svg'
import Profile from '@/public/Avatar.png'
import { Avatar, Menu } from "@mui/material";
import TelegramIcon from '@/public/icons/telegram.svg'
import {
    StyledHeaderWrapper,
    StyledHeader,
    StyledTelegram,
    StyledHomeLink, StyledAvatarButton
} from '@/app/components/layouts/DefaultLayout/DefaultLayoutHeader/styles'
import {menuItems} from "@/app/components/layouts/DefaultLayout/DefaultLayoutMenu/menu.constants";
import {
    StyledLink,
    StyledLogoutButton, StyledMenu,
    StyledMenuItem
} from '@/app/components/layouts/DefaultLayout/DefaultLayoutMenu/styles'

const DefaultLayoutHeader: FC = (): JSX.Element => {
    const [isAuth, setIsAuth] = useState(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (): void => {
        setAnchorEl(null);
    };

    return (
        <StyledHeader className="default-layout-header">
            <StyledHeaderWrapper className="container">
                <Link href='/' passHref>
                    <StyledHomeLink>
                        <Image src={Logo} alt='Logo' />
                    </StyledHomeLink>
                </Link>
                <div className="d-flex ai-center">
                    <Link href="/benches">Все лавочки</Link>
                    <div className="d-flex ai-center ml-36">
                        { isAuth ? (
                            <>
                                <span className="text mr-12">Никита</span>
                                <StyledAvatarButton
                                    id="profile-button"
                                    aria-controls={open ? 'profile-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <Avatar sx={{ width: 62, height: 62 }}>
                                        <Image src={Profile} alt="Profile" />
                                    </Avatar>
                                </StyledAvatarButton>
                                <StyledMenu
                                    id="profile-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        style: {
                                            padding: 0,
                                        },
                                        'aria-labelledby': 'resources-button',
                                    }}
                                    disableAutoFocusItem
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
                                >
                                    { menuItems.map((item) => (
                                        <StyledMenuItem key={item.title}>
                                            <Link href={item.url as string} passHref>
                                                <StyledLink>{item.title}</StyledLink>
                                            </Link>
                                        </StyledMenuItem>
                                    )) }
                                    <StyledMenuItem>
                                        <StyledLogoutButton>
                                            Выйти
                                        </StyledLogoutButton>
                                    </StyledMenuItem>
                                </StyledMenu>
                            </>
                        ) : (
                            <>
                                {/*<Button className="default-layout-header__login-button mr-16">*/}
                                {/*    Войти*/}
                                {/*</Button>*/}
                                <StyledTelegram className="default-layout-header__telegram">
                                    <Image src={TelegramIcon} alt="telegram" />
                                </StyledTelegram>
                            </>
                        )}

                    </div>
                </div>
            </StyledHeaderWrapper>
        </StyledHeader>
    );
};

export default DefaultLayoutHeader;
import React, {FC, useEffect, useRef, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import Profile from '@/public/Avatar.png'
import {Avatar, Menu} from "@mui/material";
import {
    StyledAvatarButton,
    StyledHeader,
    StyledHeaderWrapper,
    StyledHomeLink,
} from '@/app/components/layouts/DefaultLayout/DefaultLayoutHeader/styles'
import {menuItems} from "@/app/components/layouts/DefaultLayout/DefaultLayoutMenu/menu.constants";
import {
    StyledLink,
    StyledLogoutButton,
    StyledMenuItem
} from '@/app/components/layouts/DefaultLayout/DefaultLayoutMenu/styles'
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login';
import usersApi from "@/app/api/users/users.api";

const DefaultLayoutHeader: FC = (): JSX.Element => {
    const [isAuth, setIsAuth] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const telegramWidget = useRef<any>(null)

    const open = Boolean(anchorEl);

    const handleAnchorSet = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (): void => {
        setAnchorEl(null);
    };

    const handleTelegramResponse = async (response: any): Promise<void> => {
        const [error, data] = await usersApi.loginViaTelegram(response)

        if (!error && data) {
            localStorage.setItem('token', data.access)

            location.reload()
        }
    };

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
        <StyledHeader className="default-layout-header">
            <StyledHeaderWrapper className="container">
                <div className="d-flex ai-center">
                    <Link href='/' passHref>
                        <StyledHomeLink>
                            <CommonIcon name="logo" width={260} height={32} />
                        </StyledHomeLink>
                    </Link>
                    <Link href="/benches" passHref>
                        <a>Все лавочки</a>
                    </Link>
                </div>
                <div className="d-flex ai-center">
                    <div className="d-flex ai-center ml-36">
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
                                        <Image src={Profile} alt="Profile" />
                                    </Avatar>
                                </StyledAvatarButton>
                                <Menu
                                    id="profile-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    MenuListProps={{
                                        style: {
                                            padding: 0,
                                        },
                                        'aria-labelledby': 'profile-button',
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
                            </>
                        ) : (
                            <>
                                <TelegramLoginButton ref={telegramWidget} dataOnauth={handleTelegramResponse} botName={process.env.BOT_USERNAME}/>
                            </>
                        )}

                    </div>
                </div>
            </StyledHeaderWrapper>
        </StyledHeader>
    );
};

export default DefaultLayoutHeader;
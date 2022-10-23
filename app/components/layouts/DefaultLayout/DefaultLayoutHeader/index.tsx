import React, {FC, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import Logo from '@/public/icons/logo.svg'
import Profile from '@/public/Avatar.png'
import {Avatar, Button} from "@mui/material";
import TelegramIcon from '@/public/icons/telegram.svg'
import {
    StyledHeaderWrapper,
    StyledHeader,
    StyledTelegram
} from '@/app/components/layouts/DefaultLayout/DefaultLayoutHeader/styles'

const DefaultLayoutHeader: FC = (): JSX.Element => {
    const [isAuth, setIsAuth] = useState(false)

    return (
        <StyledHeader className="default-layout-header">
            <StyledHeaderWrapper>
                <Link href='/'>
                    <Image src={Logo} alt='Logo' />
                </Link>
                <div className="d-flex ai-center">
                    <Link href="/benches">Все лавочки</Link>
                    <div className="d-flex ai-center ml-36">
                        { isAuth ? (
                            <>
                                <span>Никита</span>
                                <Avatar>
                                    <Image src={Profile} alt="Profile" />
                                </Avatar>
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
import React, {FC, ReactElement, useContext, useEffect, useRef, useState} from 'react';
import {
    StyledAvatarButton,
    StyledHeader,
    StyledHeaderWrapper,
    StyledHomeLink
} from '@/app/components/Layouts/DefaultLayout/DefaultLayoutHeader/DefaultLayoutHeader.type';
import Link from 'next/link';
import Profile from '@/public/Avatar.png'
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";
import {Avatar, Menu} from "@mui/material";
import {StyledLogoutButton, StyledMenuItem } from '@/app/components/Layouts/DefaultLayout/DefaultLayoutMenu/DefaultLayoutMenu.style';
import Image from "next/image";
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login';
import {LoginResponseType, UserType} from "@/app/types/user";
import UserService from "@/app/services/User/UserService";
import {useMutation} from "react-query";
import {ErrorType} from "@/app/types/common.type";
import DefaultLayoutMenu from "@/app/components/Layouts/DefaultLayout/DefaultLayoutMenu";

const DefaultLayoutHeader: FC = (): ReactElement => {
    const [isAuth, setIsAuth] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const telegramWidget = useRef<any>(null)

    // const { enqueueSnackbar } = useSnackbar();

    const open = Boolean(anchorEl);

    const { mutateAsync } = useMutation('registration user',
        async (data: UserType) => await UserService.create(data), {
        onSuccess: (response) => {
            localStorage.setItem('token', response.access)

            location.reload()
        }
    })

    const handleAnchorSet = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (): void => {
        setAnchorEl(null);
    };

    const handleTelegramResponse = async (response: UserType): Promise<void> => {
        await mutateAsync(response)
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
        <StyledHeader>
            <StyledHeaderWrapper>
                <div className="d-f ai-c">
                    <StyledHomeLink href={'/'}>
                        <CommonIcon name="logo" width={260} height={32} />
                    </StyledHomeLink>
                    <Link href="/benches" passHref>
                        <a>Все лавочки</a>
                    </Link>
                </div>
                <div className="d-f ai-c">
                    <div className="d-f ai-c ml-36">
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
                                        <Image src={Profile} alt={'profile'} />
                                    </Avatar>
                                </StyledAvatarButton>

                                <DefaultLayoutMenu  anchorEl={anchorEl} handleLogout={handleLogout} onClose={handleMenuClose} open={open} />
                            </>
                        ) : (
                                <TelegramLoginButton
                                    ref={telegramWidget}
                                    dataOnauth={handleTelegramResponse}
                                    botName={process.env.BOT_USERNAME}
                                />
                        )}

                    </div>
                </div>
            </StyledHeaderWrapper>
        </StyledHeader>
    );
};

export default DefaultLayoutHeader;
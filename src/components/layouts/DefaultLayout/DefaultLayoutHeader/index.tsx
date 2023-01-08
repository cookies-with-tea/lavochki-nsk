import React, {useEffect, useRef, useState} from 'react';
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login'
import UserService from "@/services/User/UserService";
import {StyledHeader} from "@/components/layouts/DefaultLayout/DefaultLayoutHeader/index.style";
import {useMutation} from "react-query";
import {LoginResponseType, UserType} from "@/types/user.type";
import {ErrorType} from "@/types/common.type";
import { Button } from '@mui/material';

const createUser = async (data: UserType) => await UserService.create(data)

const DefaultLayoutHeader = () => {
    const [isAuth, setIsAuth] = useState(false)
    const telegramWidget = useRef<HTMLDivElement | null>(null)

    const { mutateAsync } = useMutation(
        'create user',
        createUser,
        {
            onSuccess: (response) => {
                localStorage.setItem('token', response.access)

                location.reload()
            }
        })

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
            Dashboard
            {
                isAuth
                    ? (<Button color={'primary'} onClick={handleLogout}>Выйти</Button>)
                    : (<TelegramLoginButton
                        ref={telegramWidget}
                        dataOnauth={handleTelegramResponse}
                        botName={import.meta.env.VITE_BOT_NAME}
                    />)
            }

        </StyledHeader>
    );
};

export default DefaultLayoutHeader
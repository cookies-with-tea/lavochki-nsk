import React, {useRef} from 'react';
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login'
import usersApi from '@/services/Authorization'
import {StyledHeader} from "@/components/Common/CommonHeader/index.style";
const CommonHeader = () => {
    const telegramWidget = useRef<any>(null)
    const handleTelegramResponse = async (response: any): Promise<void> => {
        const [error, data] = await usersApi.loginViaTelegram(response)

        if (!error && data) {
            localStorage.setItem('token', data.access)

            location.reload()
        }
    }

    return (
        <StyledHeader>
            Dashboard
            <TelegramLoginButton
                ref={telegramWidget}
                dataOnauth={handleTelegramResponse}
                botName={import.meta.env.VITE_BOT_NAME}
            />
        </StyledHeader>
    );
};

export default CommonHeader
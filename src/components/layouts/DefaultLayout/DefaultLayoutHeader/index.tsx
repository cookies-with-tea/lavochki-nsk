import React, {useRef} from 'react';
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login'
import UserService from "@/services/User/UserService";
import {StyledHeader} from "@/components/layouts/DefaultLayout/DefaultLayoutHeader/index.style";
const DefaultLayoutHeader = () => {
    const telegramWidget = useRef<any>(null)
    const handleTelegramResponse = async (response: any): Promise<void> => {
        // const [error, data] = await UserService.create(response)
        //
        // if (!error && data) {
        //     localStorage.setItem('token', data.access)
        //
        //     location.reload()
        // }
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

export default DefaultLayoutHeader
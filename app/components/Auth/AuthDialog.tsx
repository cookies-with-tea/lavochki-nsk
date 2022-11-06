import React from 'react';
import {Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import TelegramLoginButton from "telegram-login-button";
import usersApi from "@/app/api/users/users.api";

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: string) => void;
}

const AuthDialog = (props: SimpleDialogProps) => {
    const { onClose, open } = props;

    const handleClose = () => {
        // onClose(selectedValue);
        console.log('close')
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    const handleTelegramResponse = async (response: any): Promise<void> => {
        const [error, data] = await usersApi.loginViaTelegram(response)

        if (!error && data) {
            localStorage.setItem('token', data.access)

            location.reload()
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <TelegramLoginButton dataOnauth={handleTelegramResponse} botName={process.env.BOT_USERNAME} />
        </Dialog>
    );
};

export default AuthDialog;
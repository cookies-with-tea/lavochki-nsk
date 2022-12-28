import {Alert, Snackbar } from '@mui/material';
import React, {FC, ReactElement} from 'react';

interface IProps {
    isOpen: boolean
    onClose: () => void
    message?: string
}

const CommonSnackbar: FC<IProps> = ({isOpen, message, onClose}): ReactElement => {
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={2000}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <Alert severity="error">{message}</Alert>
        </Snackbar>
    );
};

export default CommonSnackbar;
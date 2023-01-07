import React, {ChangeEvent, FC, useState} from 'react';
import {
    Box, Button,
    Dialog,
    DialogTitle,
    TextField
} from "@mui/material";

interface IProps {
    open: boolean
    onClose: () => void
    updateTable: () => void
}

const BenchesModerationAcceptDialog: FC<IProps> = ({ open, onClose, updateTable }) => {
    const [reasonText, setReasonText] = useState('')

    const handleReasonTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setReasonText(e.target.value)
    }

    const handleDialogClose = (): void => {
        onClose()
    }

    const handleStatusChange = async (): Promise<void> => {
        console.log('123')
    }

    return (
        <div>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Причина принятия</DialogTitle>
                <Box className={'d-f fd-c p-12'} sx={{ width: '540px'}}>
                    <TextField
                        multiline
                        value={reasonText}
                        placeholder="Enter a reason..."
                        onChange={(e) => handleReasonTextChange(e)} minRows={2} maxRows={4}
                        sx={{ marginBottom: '24px' }}
                    />
                    <Button color={'primary'} onClick={handleStatusChange}>Submit</Button>
                </Box>
            </Dialog>
        </div>
    );
};

export default BenchesModerationAcceptDialog;
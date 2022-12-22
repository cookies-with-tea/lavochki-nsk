import React, {ChangeEvent, FC, useState} from 'react';
import {
    Box, Button,
    Dialog,
    DialogTitle,
    TextField
} from "@mui/material";
import benchesApi from "@/services/Benches";
import { ReasonType } from "@/types/bench.type";

interface IProps {
    open: boolean
    reason: ReasonType
    onClose: () => void
    updateTable: () => void
}

const BenchesModerationAcceptDialog: FC<IProps> = ({ open, reason, onClose, updateTable }) => {
    const [reasonText, setReasonText] = useState('')

    const handleReasonTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setReasonText(e.target.value)
    }

    const handleDialogClose = (): void => {
        onClose()
    }

    const handleStatusChange = async (): Promise<void> => {
        const [error, data] = await benchesApi.changeModerationStatus({
            id: reason.id,
            decision: reason.decision,
            message: reasonText
        })

        if (!error && data) {
            onClose()

            updateTable()
        }
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
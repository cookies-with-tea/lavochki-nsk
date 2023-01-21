import React, {ChangeEvent, FC, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";

interface IProps {
    visible: boolean
    onClose: () => void
    updateTable: () => void
}

const BenchesModerationDenyDialog: FC<IProps> = ({ visible, onClose, updateTable }) => {
    const [currentReason, setCurrentReason] = useState('cheats')
    const [reasonText, setReasonText] = useState('')

    const handleReasonSelect  = (event: ChangeEvent<HTMLInputElement>): void => {
        setCurrentReason((event.target as HTMLInputElement).value)
    }

    const handleReasonTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setReasonText(e.target.value)
    }

    const handleDialogClose = (): void => {
        onClose()
    }

    const handleStatusChange = async (): Promise<void> => {
        const message = reasonText.length ? reasonText : currentReason

        // const [error, data] = await benchesApi.changeModerationStatus({
        //     id: reason.id,
        //     decision: reason.decision,
        //     message
        // })
        //
        // if (!error && data) {
        //     onClose()
        //
        //     updateTable()
        // }
    }

    return (
        <div>
            <Dialog open={visible} onClose={handleDialogClose}>
                <DialogTitle>Причина отклонения</DialogTitle>
                <Box className={'d-f fd-c p-12'} sx={{ width: '540px'}}>
                    <FormControl sx={{ marginBottom: '24px' }}>
                        <RadioGroup
                            defaultValue="cheats"
                            name="reason-buttons-group"
                            value={currentReason}
                            onChange={handleReasonSelect}
                        >
                            <FormControlLabel value="cheats" control={<Radio />} label="Использование читов" />
                            <FormControlLabel value="kitchen" control={<Radio />} label="Кража с кухни" />
                            <FormControlLabel value="cookies" control={<Radio />} label="Доедание последних печенек" />
                            <FormControlLabel value="other" control={<Radio />} label="Другое" />
                        </RadioGroup>
                    </FormControl>
                    {
                        currentReason === 'other' && (
                            <TextField
                                multiline
                                value={reasonText}
                                placeholder="Enter a reason..."
                                onChange={(e) => handleReasonTextChange(e)} minRows={2} maxRows={4}
                                sx={{ marginBottom: '24px' }}
                            />
                        )
                    }
                    <Button color={'primary'} onClick={handleStatusChange}>Submit</Button>
                </Box>
            </Dialog>
        </div>
    );
};

export default BenchesModerationDenyDialog;
import React, {FC} from 'react';
import {Dialog, DialogTitle} from "@mui/material";

interface IProps {
    isOpen: boolean
    onClose: () => void
}

const BenchesDialogUpdate: FC<IProps> = ({isOpen, onClose}) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Изменить лавочку</DialogTitle>
        </Dialog>
    );
};

export default BenchesDialogUpdate;
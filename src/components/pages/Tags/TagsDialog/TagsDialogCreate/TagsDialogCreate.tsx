import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import {Box, Button, Dialog, DialogTitle, Input} from "@mui/material";
import CommonIcon from "@/components/Common/CommonIcon/CommonIcon";
import TagService from "@/services/Tag/TagService";
import {useMutation} from "react-query";

interface IProps {
    visible: boolean
    updateTable: () => void
    onClose: () => void
}

const createTag = async (title: string) => await TagService.create(title)

export const TagsDialogCreate: FC<IProps> = ({ visible, updateTable, onClose }): ReactElement => {
    const [tagTitle, setTagTitle] = useState('');

    const onValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTagTitle(event.target.value)
    }

    const handleDialogClose = (): void => {
        setTagTitle('')

        onClose()
    }

    const createTagMutation = useMutation({
        mutationKey: 'create tag',
        mutationFn: createTag,
        onSuccess: () => {
            handleDialogClose()

            updateTable()
        }
    })

    const handleTagCreate = async (): Promise<void> => {
        await createTagMutation.mutate(tagTitle)
    }

    return (
        <Dialog open={visible} onClose={handleDialogClose}>
            <Button sx={{ padding: '4px', minWidth: 0, justifyContent: 'flex-end', width: '24px', alignSelf: 'flex-end' }} onClick={handleDialogClose}>
                <CommonIcon name={'close'} width={20} height={20} />
            </Button>
            <Box sx={{ width: '500px', padding: '12px', flexDirection: 'column' }} component="form">
                <DialogTitle sx={{ padding: '4px'}}>Создать тег</DialogTitle>
                <div className={'d-f fd-c'}>
                    <Input placeholder={'Введите название'} required size="small" value={tagTitle} name={'title'} onChange={onValueChange} />
                    <Button onClick={handleTagCreate}>Создать</Button>
                </div>
            </Box>
        </Dialog>
    );
};

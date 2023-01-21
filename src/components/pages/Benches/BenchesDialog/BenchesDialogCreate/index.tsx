import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import {Box, Button, Dialog, DialogTitle, Input} from "@mui/material";
import CommonIcon from "@/components/Common/CommonIcon/CommonIcon";
import {BenchType} from "@/types/bench.type";
import BenchesDialogImages from "@/components/pages/Benches/BenchesDialog/BenchesDialogImages";
import {SlideType} from "@/components/pages/Benches/BenchesDialog/BenchesDialogImages/BenchesDialogImages.type";
import {useMutation} from "react-query";
import BenchService from "@/services/Bench/BenchService";

interface IProps {
    visible: boolean
    onClose: () => void
    updateTable: () => void
}

const createBench = async (bench: Partial<BenchType>) => await BenchService.create(bench)

const BenchesDialogCreate: FC<IProps> = ({visible, onClose, updateTable}): ReactElement => {
    const [bench, setBench] = useState<BenchType>({
        address: "",
        id: "",
        images: [''],
        is_active: false,
        lat: 0,
        lng: 0,
        owner: "",
        tags: []
    })

    const onValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const target = event.target
        const value = target.name === 'lat' || target.name === 'lng' ? +target.value : target.value

        setBench({
            ...bench,
            [target.name]: value
        })
    }

    const handleDialogClose = (): void => {
        onClose()
    }

    const handleImagesUpdate = (imageKey: string) => {
        const benchImages = bench.images as SlideType[]
        const filteredImages = benchImages.filter((image) => image.key !== imageKey)

        setBench({
            ...bench,
            images: filteredImages
        })
    }

    const { mutateAsync } = useMutation('update bench', createBench.bind(null, bench), {
        onSuccess: () => {
            updateTable()

            onClose()
        }
    })

    const handleBenchCreate = async (): Promise<void> => {
        await mutateAsync()
    }

    return (
        <Dialog open={visible} onClose={handleDialogClose}>
            <Box sx={{ width: '500px', padding: '12px' }} component="form">
                <div className={'d-f jc-fe'}>
                    {/* TODO: Кнопка reset, которая будет возвращать форму в исходный вид */}
                    {/*<p>reset</p>*/}
                    <Button sx={{ padding: '4px', minWidth: 0 }} onClick={handleDialogClose}>
                        <CommonIcon name={'close'} width={20} height={20} />
                    </Button>
                </div>
                <DialogTitle sx={{ padding: '4px'}}>Создать лавочку</DialogTitle>
                <div className={'mb-8'}>
                    <p>
                        Координаты:
                    </p>
                    <div>
                        <Input required size="small" value={bench.lat} name={'lat'} onChange={onValueChange} />
                        <Input required size="small" value={bench.lng} name={'lng'} onChange={onValueChange} />
                    </div>
                </div>
                <div className={'mb-12'}>
                    <p className={'mb-8'}>Изображения</p>
                    <BenchesDialogImages images={bench.images as SlideType[]} onImagesUpdate={handleImagesUpdate} />
                </div>
                <div className={'d-f jc-sb'}>
                    <Button color={'warning'} variant={'outlined'}>Отмена</Button>
                    <Button color={'success'} variant={'outlined'} onClick={handleBenchCreate}>Создать</Button>
                </div>
            </Box>
        </Dialog>
    );
};

export default BenchesDialogCreate
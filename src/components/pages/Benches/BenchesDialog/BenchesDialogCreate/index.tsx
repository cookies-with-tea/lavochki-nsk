import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import {Box, Button, Dialog, DialogTitle, Input} from "@mui/material";
import CommonIcon from "@/components/Common/CommonIcon/CommonIcon";
import {BenchType} from "@/types/bench.type";
import BenchesDialogImages from "@/components/pages/Benches/BenchesDialog/BenchesDialogImages";
import {useMutation} from "react-query";
import BenchService from "@/services/Bench/BenchService";

interface IProps {
    visible: boolean
    onClose: () => void
    updateTable: () => void
}

const createBench = async (bench: FormData) => await BenchService.create(bench)

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

    const handleImagesAppend = (images: File[]): void => {
        setBench({
            ...bench,
            images: [...bench.images, ...images]
        })
    }

    const handleImageRemove = (index: number): void => {
        setBench({
          ...bench,
            images: bench.images.slice(index, 1)
        })
    }

    const createBenchMutation = useMutation({
        mutationKey: 'create bench',
        mutationFn: createBench,
        onSuccess: () => {
            onClose()

            updateTable()
        }
    })

    const handleBenchCreate = async (): Promise<void> => {
        const formData = new FormData()

        formData.append('address', bench?.address ? bench.address.toString() : '')
        formData.append('id', bench.id)
        formData.append('is_active', bench.is_active.toString())
        formData.append('lat', bench.lat.toString())
        formData.append('lng', bench.lng.toString())
        formData.append('owner', bench.owner)
        // formData.append('tags', JSON.stringify(bench.tags))

        if (bench.images.length >= 1) {
            bench.images.forEach((image) => {
                if (typeof image !== 'string') {
                    formData.append('images', image as File)
                }
            })
        }

        createBenchMutation.mutate(formData)
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
                    <BenchesDialogImages onImagesLoad={handleImagesAppend} onImageRemove={handleImageRemove}/>
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
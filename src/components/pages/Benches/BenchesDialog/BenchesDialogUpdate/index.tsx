import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Box, Button, Dialog, DialogTitle, Input} from "@mui/material";
import {BenchType} from "@/types/bench.type";
import CommonIcon from "@/components/Common/CommonIcon/CommonIcon";
import BenchService from "@/services/Bench/BenchService";
import {useMutation} from "react-query";
import BenchesDialogImages from "@/components/pages/Benches/BenchesDialog/BenchesDialogImages";
import {SlideType} from "@/components/pages/Benches/BenchesDialog/BenchesDialogImages/BenchesDialogImages.type";

interface IProps {
    isOpen: boolean
    bench?: BenchType
    onClose: () => void
    updateTable: () => void
}

const updateBench = async (bench: Partial<BenchType>) => await BenchService.update(bench)

const BenchesDialogUpdate: FC<IProps> = ({isOpen, onClose, bench, updateTable}) => {
    const [currentBench, setCurrentBench] = useState<BenchType>({
        address: "",
        id: "",
        images: [],
        is_active: false,
        lat: 0,
        lng: 0,
        owner: "",
        tags: []
    })

    const handleDialogClose = (): void => {
        onClose()
    }

    const { mutateAsync } = useMutation('update bench', updateBench.bind(null, currentBench), {
        onSuccess: () => {
            updateTable()

            onClose()
        }
    })

    const onValueUpdate = (event: ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.name
        const value = name === 'lat' || name === 'lng' ? +event.target.value : event.target.value

        setCurrentBench({
            ...currentBench,
            [name]: value
        })
    }

    const handleBenchUpdate = async (): Promise<void> => {
        await mutateAsync()
    }

    const handleImagesUpdate = (imageKey: string) => {
        const benchImages = currentBench.images as SlideType[]
        const filteredImages = benchImages.filter((image) => image.key !== imageKey)

        setCurrentBench({
            ...currentBench,
            images: filteredImages
        })
    }

    useEffect(() => {
        if (bench) {
            const newImages: SlideType[] = []

            bench.images.forEach((image) => {
                newImages.push({
                    url: image,
                    key: Math.random().toString()
                } as SlideType)
            })
            setCurrentBench({...bench, images: newImages})
        }
    }, [bench])

    return (
        <Dialog open={isOpen} onClose={handleDialogClose}>
            <Box sx={{ width: '500px', padding: '12px' }} component="form">
                <div className={'d-f jc-fe'}>
                    {/* TODO: Кнопка reset, которая будет возвращать форму в исходный вид */}
                    {/*<p>reset</p>*/}
                    <Button sx={{ padding: '4px', minWidth: 0 }} onClick={handleDialogClose}>
                        <CommonIcon name={'close'} width={20} height={20} />
                    </Button>
                </div>
                <DialogTitle sx={{ padding: '4px'}}>Изменить лавочку</DialogTitle>
                {
                    currentBench
                    ? (
                        <>
                            <div className={'mb-8'}>
                                <p>
                                    Лавочка №{currentBench.id}
                                </p>
                            </div>
                            <div className={'mb-12'}>
                                <p>
                                    Координаты:
                                </p>
                                <div>
                                    <Input required size="small" value={currentBench.lat} name={'lat'} onChange={onValueUpdate} />
                                    <Input required size="small" value={currentBench.lng} name={'lng'} onChange={onValueUpdate} />
                                </div>
                            </div>
                            <div className={'mb-12'}>
                                <p className={'mb-8'}>Изображения</p>
                                <BenchesDialogImages images={currentBench.images as SlideType[]} onImagesUpdate={handleImagesUpdate} />
                            </div>
                            <div className={'d-f jc-sb'}>
                                <Button color={'success'} variant={'outlined'} onClick={handleBenchUpdate}>Изменить</Button>
                                <Button color={'warning'} variant={'outlined'}>Отмена</Button>
                            </div>
                        </>
                        )
                    : <div>Нет данных</div>
                }
            </Box>
        </Dialog>
    );
};

export default BenchesDialogUpdate;
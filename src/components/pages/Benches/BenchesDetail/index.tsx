import React, {FC, ReactElement} from 'react';
import {BenchType} from "@/types/bench.type";
import {Button, Drawer, ImageList} from "@mui/material";
import {
    StyledDetail,
    StyledHeader,
    StyledLabel, StyledListImage, StyledText,
    StyledTitle
} from "@/components/pages/Benches/BenchesDetail/BenchesDetail.style";
import CommonIcon from "@/components/Common/CommonIcon/CommonIcon";

interface IProps {
    bench?: BenchType
    isOpen: boolean
    onClose: () => void
    updateDialogToggle: () => void
}

const BenchesDetail: FC<IProps> = ({ bench, isOpen, onClose, updateDialogToggle}): ReactElement => {
    return (
        <Drawer
            anchor={'right'}
            open={isOpen}
            onClose={onClose}
        >
            <StyledHeader>
                <Button sx={{ padding: 0, display: 'block', minWidth: 0 }} onClick={onClose}>
                    <CommonIcon name={'close'} width={20} height={20} />
                </Button>
            </StyledHeader>
            {
                !bench
                    ? <div>Нет данных</div>
                    : (
                        <StyledDetail>
                            <div>
                                <StyledTitle>
                                    Лавочка #<span>{bench.id}</span>
                                </StyledTitle>
                                <div>
                                    <div className={'mb-22'}>
                                        <StyledLabel>
                                            Владелец
                                        </StyledLabel>
                                        <StyledText>{bench.owner}</StyledText>
                                    </div>
                                    <div className={'mb-22'}>
                                        <StyledLabel>Расположение</StyledLabel>
                                        <StyledText>{bench.lat}, {bench.lng}</StyledText>
                                    </div>
                                    <div className={'d-f fw-w'}>
                                        <ImageList cols={2} rowHeight={100} sx={{ maxHeight: '400px' }}>
                                            {
                                                bench.images && (
                                                    bench.images.map((image, index) => (
                                                        <StyledListImage key={index}>
                                                            <img
                                                                src={typeof image !== "string" ? image?.url : image}
                                                                loading={'lazy'}
                                                                alt={''}
                                                            />
                                                        </StyledListImage>
                                                    ))
                                                )
                                            }
                                        </ImageList>
                                    </div>
                                </div>
                            </div>
                            <div className={'d-f fd-c'}>
                               <Button
                                   color={'warning'}
                                   variant="outlined"
                                   className={'mb-8'}
                                   onClick={updateDialogToggle}
                               >
                                   Редактировать
                               </Button>
                               <Button color={'error'} variant="outlined">Удалить</Button>
                           </div>
                        </StyledDetail>
                    )
            }
        </Drawer>
    );
};

export default BenchesDetail;
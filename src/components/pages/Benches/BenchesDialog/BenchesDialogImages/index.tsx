import {ChangeEvent, FC, ReactElement, useEffect, useState} from "react";
import {Swiper} from "swiper/react";
import {
    SlideType
} from "@/components/pages/Benches/BenchesDialog/BenchesDialogImages/BenchesDialogImages.type";
import {
    StyledClose, StyledRefresh,
    StyledSlide, StyledSlideAddImage
} from "@/components/pages/Benches/BenchesDialog/BenchesDialogImages/BenchesDialogImages.style";
import CommonIcon from "@/components/Common/CommonIcon/CommonIcon";
import {Box} from "@mui/material";

interface IProps {
    remoteImages?: string[]
    onImagesLoad: (images: File[]) => void
    onImageRemove: (index: number) => void
}

// 1. Записываем картинку в виде url для отображения
// 2. Записываем картинку в file для отправки в formData

const BenchesDialogImages: FC<IProps> = ({ remoteImages, onImagesLoad, onImageRemove }): ReactElement => {
    const [imageURLs, setImageURLs] = useState<SlideType[]>([])
    const [images, setImages] = useState<File[]>([])
    const handleImageClear = (imageKey: string, index: number): void => {
        setImageURLs(() => [...imageURLs.filter((imageURL) => imageURL.key !== imageKey)])

        onImageRemove(index)
    }

    const changeFiles = (event: ChangeEvent<HTMLInputElement>): void => {
        // Array.from(event.target.files) == Array.prototype.slice.call(event.target.files)
        // const fileList: File[] = Array.prototype.slice.call(event.target.files)
        if (event.target.files) {
            const fileList: File[] = Array.from(event.target.files)

            setImages([...fileList])

            onImagesLoad(fileList)
        }
    }

    useEffect(() => {
        if (images.length < 1) return

        images.forEach((image) => {
            setImageURLs((prevState) => [
                ...prevState,
                {
                    url: URL.createObjectURL(image),
                    key: Math.random().toString(36).substring(2,7)
                },
            ])
        })
    }, [images])

    useEffect(() => {
        if (remoteImages?.length) {

            remoteImages.forEach((image) => {
                setImageURLs((prevState) => [
                    {
                        url: image,
                        key: Math.random().toString(36).substring(2,7)
                    },
                ])
            })
        }
    }, [remoteImages])

    return (
        <Swiper
            spaceBetween={15}
            navigation
            slidesPerView={3}
        >
            <StyledSlideAddImage>
                <Box component="label" sx={{width: '100%', height: '100%'}}>
                    <div className={'plus'}></div>
                    <input hidden accept="image/*" multiple type="file" onChange={changeFiles} />
                </Box>
            </StyledSlideAddImage>
            {
                imageURLs && imageURLs.length > 0 ? (
                    imageURLs.map((image, index) => image && (
                        <StyledSlide key={image.key}>
                            <StyledClose onClick={handleImageClear.bind(null, image.key, index)}>
                                <CommonIcon name={'close'} width={12} height={12} />
                            </StyledClose>
                            <StyledRefresh>
                                <CommonIcon name={'refresh'} width={12} height={12} />
                            </StyledRefresh>
                            <img src={image.url} alt="" />
                        </StyledSlide>
                    ))
                ) : null
            }
        </Swiper>
    );
};

export default BenchesDialogImages;
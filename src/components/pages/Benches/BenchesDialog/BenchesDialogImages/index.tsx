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
    images: SlideType[]
    onImagesUpdate: (imageKey: string) => void
}

const BenchesDialogImages: FC<IProps> = ({ images, onImagesUpdate }): ReactElement => {
    const [currentImages, setCurrentImages] = useState<SlideType[]>([])

    const setDefaultImages = (): void => {
        setCurrentImages(images)
    }

    const handleImageClose = (imageKey: string): void => {
        onImagesUpdate(imageKey)
    }

    const uploadFile = (event: ChangeEvent<HTMLInputElement>): void => {
        const fileReader = new FileReader()
        const files = event.target.files

        if (event.target && files) {
            fileReader.readAsDataURL(files[0]);

            const imageSrc = URL.createObjectURL(files[0])

            fileReader.onload = () => {
                setCurrentImages((prevState) => [
                    {
                        url: imageSrc,
                        key: Date.now().toString()
                    },
                    ...prevState]
                )
            }
        }
    }

    useEffect(() => {
        if (images) {
            setDefaultImages()
        }
    }, [images])

    return (
        <Swiper
            spaceBetween={15}
            navigation
            slidesPerView={3}
        >
            <StyledSlideAddImage>
                <Box component="label" sx={{width: '100%', height: '100%'}}>
                    <div className={'plus'}></div>
                    <input hidden accept="image/*" multiple type="file" onChange={uploadFile} />
                </Box>
            </StyledSlideAddImage>
            {
                currentImages && (
                    currentImages.map((image) => (
                        <StyledSlide key={image.key}>
                            <StyledClose onClick={handleImageClose.bind(null, image.key)}>
                                <CommonIcon name={'close'} width={12} height={12} />
                            </StyledClose>
                            <StyledRefresh>
                                <CommonIcon name={'refresh'} width={12} height={12} />
                            </StyledRefresh>
                            <img src={image.url} alt="" />
                        </StyledSlide>
                    ))
                )
            }
        </Swiper>
    );
};

export default BenchesDialogImages;
import { FC, useRef } from 'react'
import { Swiper } from 'swiper/react';
import { Swiper as SwiperType, Navigation } from 'swiper';
import Image from "next/image";

import {
    StyledSlide,
    StyledNavigation,
    StyledGradient
} from "@/app/components/pages/DetailedBench/DetailedBenchSlider/DetailedBenchSlier.styles";

import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";

const DetailedBenchSlider: FC<{ images: string[] }> = ({ images }) => {
    const swiperRef = useRef<SwiperType | null>(null)
    const swiperNavPrevRef = useRef(null)
    const swiperNavNextRef = useRef(null)

    return (
        <div className={"detailed-bench-slider"}>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: swiperNavNextRef.current,
                    prevEl: swiperNavPrevRef.current
                }}
                centeredSlides={true}
                loop={true}
                spaceBetween={36}
                slidesPerView={1.5}
                onBeforeInit={(swiper: any) => {
                    if (swiperRef) {
                        swiperRef.current = swiper
                    }
                }}
            >
                { images && images.map((image: string, index: number) => (
                    <StyledSlide key={index}>
                        <div className={"w-100 h-100"}>
                            <Image src={image} alt="image" layout='fill' objectFit='cover' />
                        </div>
                    </StyledSlide>
                ))}
            </Swiper>
            <div>
                <StyledGradient />
                <StyledGradient />
            </div>
            <StyledNavigation>
                <button className="swiper-button-prev" ref={swiperNavPrevRef}>
                    <CommonIcon name="arrow-light" width={27} height={22} />
                </button>
                <button className="swiper-button-next" ref={swiperNavNextRef}>
                    <CommonIcon name="arrow-light" width={27} height={22} reverse />
                </button>
            </StyledNavigation>
        </div>
    )
}

export default DetailedBenchSlider

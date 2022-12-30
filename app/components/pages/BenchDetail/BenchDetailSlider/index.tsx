import { FC, useRef } from 'react'
import { Swiper } from 'swiper/react';
import { Swiper as SwiperType, Navigation } from 'swiper';
import Image from "next/image";

import {
    StyledSlide,
    StyledNavigation,
    StyledGradient
} from '@/app/components/pages/BenchDetail/BenchDetailSlider/BenchDetailSlider.style'

import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";

const BenchDetailSlider: FC<{ images: string[] }> = ({ images }) => {
    const swiperRef = useRef<SwiperType | null>(null)
    const swiperNavPrevRef = useRef<HTMLDivElement | null>(null)
    const swiperNavNextRef = useRef<HTMLDivElement | null>(null)

    return (
        <div className={"detailed-bench-slider"}>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: swiperNavNextRef.current,
                    prevEl: swiperNavPrevRef.current
                }}
                spaceBetween={36}
                slidesPerView={1.5}
                centeredSlides
                roundLengths
                centeredSlidesBounds
                loop
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
                <div className="swiper-button-prev" ref={swiperNavPrevRef}>
                    <CommonIcon name="arrow-light" width={27} height={22} />
                </div>
                <div className="swiper-button-next" ref={swiperNavNextRef}>
                    <CommonIcon name="arrow-light" width={27} height={22} reverse />
                </div>
            </StyledNavigation>
        </div>
    )
}

export default BenchDetailSlider

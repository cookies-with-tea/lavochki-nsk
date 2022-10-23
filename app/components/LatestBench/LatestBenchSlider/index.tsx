import React, {FC, useRef} from 'react';
import { Swiper } from 'swiper/react';
import { Swiper as SwiperType, Navigation } from 'swiper';
import {StyledNavigation, StyledSlide} from "@/app/components/LatestBench/LatestBenchSlider/styles";
import Slide1 from '@/public/benches/1.png'
import Slide2 from '@/public/benches/2.png'
import Slide3 from '@/public/benches/3.png'
import Slide4 from '@/public/benches/1.png'
import Image from "next/image";
import Arrow from '@/public/icons/arrow.svg'

// TODO: Может быть слайдеры будут связаны друг с другом. При интеграции надо проверить.
const LatestBenchSlider: FC<any> = ({ className }) => {
    const swiperRef = useRef<SwiperType | null>(null)

    return (
        <div className={className}>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                spaceBetween={22}
                slidesPerView={3.5}
                onBeforeInit={(swiper) => {
                    if (swiperRef) {
                        console.log(swiper)
                        swiperRef.current = swiper;
                    }
                }}
            >
                <StyledSlide>
                    <Image src={Slide1} alt="Bench" />
                </StyledSlide>
                <StyledSlide>
                    <Image src={Slide2} alt="Bench" />
                </StyledSlide>
                <StyledSlide>
                    <Image src={Slide3} alt="Bench" />
                </StyledSlide>
                <StyledSlide>
                    <Image src={Slide4} alt="Bench" />
                </StyledSlide>
                <StyledSlide>
                    <Image src={Slide3} alt="Bench" />
                </StyledSlide>
                <StyledSlide>
                    <Image src={Slide2} alt="Bench" />
                </StyledSlide>
            </Swiper>
            <StyledNavigation>
                <button className="swiper-button-prev" onClick={() => swiperRef.current?.slidePrev()}>
                    <Image src={Arrow} alt="prev" />
                </button>
                <button className="swiper-button-next" onClick={() => swiperRef.current?.slideNext()}>
                    <Image src={Arrow} alt="next" />
                </button>
            </StyledNavigation>
        </div>
    );
};

export default LatestBenchSlider;
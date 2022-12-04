import React, {createRef, FC, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Swiper as SwiperType, Navigation } from 'swiper';
import {StyledNavigation, StyledSlide} from "@/app/components/LatestBench/LatestBenchSlider/styles";
import Image from "next/image";
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";

const LatestBenchSlider: FC<any> = ({ images, className }) => {
    const swiperRef = useRef<SwiperType | null>(null)
    const swiperNavPrevRef = useRef(null)
    const swiperNavNextRef = useRef(null)

    return (
        <div className={className}>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: swiperNavNextRef.current,
                    prevEl: swiperNavPrevRef.current
                }}
                spaceBetween={22}
                slidesPerView={3.5}
                onBeforeInit={(swiper: any) => {
                    if (swiperRef) {
                        swiperRef.current = swiper
                    }
                }}
            >
                { images && images.map((image: string) => (
                    <StyledSlide key={image}>
                        <Image src={image} alt="image" width={240} height={240} />
                    </StyledSlide>
                ))}
            </Swiper>
            <StyledNavigation>
                <button className="swiper-button-prev" ref={swiperNavPrevRef}>
                    <CommonIcon name="arrow" width={27} height={22} />
                </button>
                <button className="swiper-button-next" ref={swiperNavNextRef}>
                    <CommonIcon name="arrow" width={27} height={22} />
                </button>
            </StyledNavigation>
        </div>
    );
};

export default LatestBenchSlider;
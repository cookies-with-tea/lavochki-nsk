import React, {FC, useRef} from 'react';
import {Navigation, Swiper as SwiperType} from "swiper";
import {Swiper} from "swiper/react";
import {StyledNavigation} from "@/app/components/LatestBench/LatestBenchSlider/styles";
import Image from "next/image";
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";
import {StyledSLide} from "@/app/components/pages/DetailedBench/DetailedBenchSlider/DetailedBenchSlier.styles";

import img from '@/app/assets/images/image.png'

const images = [
    img,
    img
]

const DetailedBenchSlider: FC<any> = ({ className }) => {
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
                spaceBetween={36}
                slidesPerView={1.5}
                onBeforeInit={(swiper: any) => {
                    if (swiperRef) {
                        swiperRef.current = swiper
                    }
                }}
            >
                { images && images.map((image: any, index: number) => (
                    <StyledSLide key={index}>
                        <Image src={img} alt="image" width="100%" height="100%" objectFit={"cover"} />
                    </StyledSLide>
                ))}
            </Swiper>
            <StyledNavigation>
                <button className="swiper-button-prev" ref={swiperNavPrevRef}>
                    <CommonIcon name="arrow-light" width={32} height={32} />
                </button>
                <button className="swiper-button-next" ref={swiperNavNextRef}>
                    <CommonIcon name="arrow-light" width={32} height={32} />
                </button>
            </StyledNavigation>
        </div>
    );
};

export default DetailedBenchSlider;

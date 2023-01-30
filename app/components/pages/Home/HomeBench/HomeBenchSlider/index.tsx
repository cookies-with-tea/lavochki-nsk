import React, { FC, useRef } from 'react'
import { Swiper } from 'swiper/react'
import SwiperCore, { Swiper as SwiperType, Navigation } from 'swiper'
import Image from 'next/image'
import CommonIcon from '@/app/components/Common/ui/CommonIcon/CommonIcon'
import {
  StyledSlide
} from 
  '@/app/components/pages/Home/HomeBench/HomeBenchSlider/HomeBenchSlider.style'
import { StyledNavigation } from '@/app/styles/vendor/swiper/_swiper'
import { BenchType } from '@/app/types/bench.type'

interface IProps {
  bench: BenchType
  className?: string
  openPreviewImage: (benchId: string, index: number) => void
}

const HomeBenchSlider: FC<IProps> = ({ bench, className, openPreviewImage }) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const swiperNavPrevRef = useRef<HTMLDivElement>(null)
  const swiperNavNextRef = useRef<HTMLDivElement>(null)

  SwiperCore.use([Navigation])

  return (
    <div className={className}>
      <Swiper
        navigation={{
          nextEl: swiperNavNextRef.current,
          prevEl: swiperNavPrevRef.current
        }}
        spaceBetween={22}
        slidesPerView={3.5}
        onInit={(swiper) => {
          swiperRef.current = swiper
          swiper.navigation.nextEl =
            swiperNavNextRef.current as unknown as HTMLDivElement
          swiper.navigation.prevEl =
            swiperNavPrevRef.current as unknown as HTMLDivElement

          swiper.navigation.init()
          swiper.navigation.update()
        }}
      >
        { bench?.images.map((image, index) => (
          <StyledSlide key={index} onClick={() => openPreviewImage(bench.id, index)}>
            <Image src={image} alt="image" width={240} height={240} />
          </StyledSlide>
        ))}
      </Swiper>
      <StyledNavigation>
        <div className="swiper-button-prev" ref={swiperNavPrevRef}>
          <CommonIcon name="arrow" width={27} height={22} reverse={true} />
        </div>
        <div className="swiper-button-next" ref={swiperNavNextRef}>
          <CommonIcon name="arrow" width={27} height={22} />
        </div>
      </StyledNavigation>
    </div>
  )
}

export default HomeBenchSlider

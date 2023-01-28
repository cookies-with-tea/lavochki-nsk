import React, { FC, ReactElement, useRef } from 'react'
import { BenchType } from '@/app/types/bench.type'
import SwiperCore, { Navigation, Swiper as SwiperType } from 'swiper'
import { Swiper } from 'swiper/react'
import BenchCard from '@/app/components/ui/Bench/BenchCard/BenchCard'
import { StyledNavigation } from '@/app/styles/vendor/swiper/_swiper'
import CommonIcon from '@/app/components/Common/CommonIcon/CommonIcon'
import {
  StyledSlide
} from '@/app/components/pages/BenchDetail/BenchDetailNear/BenchDetailNearSlider/BenchDetailNearSlider.style'

interface IProps {
  benches: BenchType[]
}
const BenchDetailNearSlider: FC<IProps> = ({ benches }): ReactElement => {
  const swiperRef = useRef<SwiperType | null>(null)
  const swiperNavPrevRef = useRef<HTMLDivElement | null>(null)
  const swiperNavNextRef = useRef<HTMLDivElement | null>(null)

  SwiperCore.use([Navigation])

  return (
    <div className={'p-relative'}>
      <Swiper
        navigation={{
          nextEl: swiperNavNextRef.current,
          prevEl: swiperNavPrevRef.current
        }}
        spaceBetween={22}
        slidesPerView={4}
        observer={true}
        observeParents={true}
        onInit={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {
          benches?.map((bench) => (
            <StyledSlide key={bench.id}>
              <BenchCard key={bench.id} bench={bench} />
            </StyledSlide>
          ))
        }
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

export default BenchDetailNearSlider
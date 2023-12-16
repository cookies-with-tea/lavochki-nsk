'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import { BenchTypes } from '@/shared/types/bench'
import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperClass } from 'swiper'
import Image from 'next/image'
import { Button, Icon } from '@/components/shared'
import { Navigation } from 'swiper/modules'

interface IBenchSliderProps {
  images: BenchTypes.One['images']
}

export const BenchSlider = ({ images }: IBenchSliderProps) => {
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  const latestBenchSlides = images.map((image, index) => (
    <SwiperSlide key={index}>
      <Image className={styles['bench-slider__image']} src={image} alt={''} width={830} height={550} />
    </SwiperSlide>
  ))

  useEffect(() => {
    if (swiper) {
      // @ts-ignore
      swiper.params.navigation.prevEl = prevRef.current
      // @ts-ignore
      swiper.params.navigation.nextEl = nextRef.current

      swiper.navigation.init()
      swiper.navigation.update()
    }
  }, [swiper])

  return (
    <div className={styles['bench-slider']}>
      <Swiper
        updateOnWindowResize
        observer // TODO: Прочитать про это
        observeParents
        centeredSlides
        roundLengths
        centeredSlidesBounds
        loop
        className={styles['bench-slider__content']}
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current
        }}
        spaceBetween={36}
        slidesPerView={1.5}
        onSwiper={setSwiper}
      >
        { latestBenchSlides }
      </Swiper>

      <div>
        <div className={styles['bench-slider__gradient']}/>

        <div className={styles['bench-slider__gradient']}/>
      </div>

      <div className={styles['bench-slider__navigation']}>
        <button type={'button'} className={styles['bench-slider__button']} ref={prevRef}>
          <Icon name={'arrow-light'} />
        </button>

        <button type={'button'} className={styles['bench-slider__button']} ref={nextRef}>
          <Icon reversed name={'arrow-light'} />
        </button>
      </div>
    </div>
  )
}

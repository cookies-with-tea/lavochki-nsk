'use client'

import styles from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { Button, Icon } from '@/components/shared'
import { BenchTypes } from '@/shared/types/bench'
import Image from 'next/image'
import { latestBenchSliderConfig } from '@/components/pages/home/latest-bench/latest-bench-slider/config'
import { useEffect, useRef, useState } from 'react'

interface ILatestBenchSliderProps {
  images: BenchTypes.One['images']
}

export const LatestBenchSlider = ({ images }: ILatestBenchSliderProps) => {
	const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

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
    <div className={styles['latest-bench-slider']}>
      <Swiper
        updateOnWindowResize
        observer // TODO: Прочитать про это
        observeParents
        className={styles['latest-bench-slider__content']}
        breakpoints={latestBenchSliderConfig.BREAKPOINTS}
        modules={latestBenchSliderConfig.MODULES}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current
        }}
        onSwiper={setSwiper}
      >
        {
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image className={styles['latest-bench-slider__image']} src={image} alt={''} width={190} height={190} />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className={styles['latest-bench-slider__navigation']}>
        <Button icon={<Icon reversed name={'arrow'} />} className={styles['latest-bench-slider__button']} ref={prevRef} />

        <Button icon={<Icon name={'arrow'} />} className={styles['latest-bench-slider__button']} ref={nextRef} />
      </div>
    </div>
  )
}

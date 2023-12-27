'use client'

import styles from './styles.module.scss'
import { Swiper } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { Button, Icon } from '@/components/shared'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'
import cn from 'classnames'
import { useScreen } from '@/shared/lib/hooks/use-screen'

interface ILatestBenchSliderProps extends SwiperOptions {
  slides: ReactNode
}

export const BenchesSlider = (props: ILatestBenchSliderProps) => {
  const { slides, ...restProps } = props

  const { isMobile } = useScreen()

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
    <div className={cn('benches-slider',styles['benches-slider'])}>
      <Swiper
        updateOnWindowResize
        observer // TODO: Прочитать про это
        observeParents
        className={styles['benches-slider__content']}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current
        }}
        modules={[Navigation]}
        onSwiper={setSwiper}
        {...restProps}
      >
        { slides }
      </Swiper>

      {
        isMobile ? null
          : (
            <div className={styles['benches-slider__navigation']}>
              <Button
                icon={<Icon reversed name={'arrow'}/>}
                className={cn('benches-slider__button', styles['benches-slider__button'])}
                ref={prevRef}
              />

              <Button
                icon={<Icon name={'arrow'}/>}
                className={cn('benches-slider__button', styles['benches-slider__button'])}
                ref={nextRef}
              />
            </div>
          )
      }
    </div>
  )
}

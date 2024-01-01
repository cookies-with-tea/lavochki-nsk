'use client'

import styles from './styles.module.scss'
import { BenchTypes } from '@/shared/types/bench'
import { Button, Icon } from '@/components/shared'
import Link from 'next/link'
import { BenchesSlider } from '@/components/widgets/benches-slider'
import { latestBenchSliderConfig } from 'src/components/pages/home/latest-bench/config'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import { useScreen } from '@/shared/lib/hooks'

interface IBenchProps {
  bench: BenchTypes.One
}

export const LatestBench = ({ bench }: IBenchProps) => {
  const { isMobile } = useScreen()

  const slideSize = isMobile ? 120 : 190

  const slides = bench.images.map((image, index) => (
    <SwiperSlide key={index}>
      <Image className={styles['latest-bench__image']} src={image} alt={''} width={slideSize} height={slideSize} />
    </SwiperSlide>
  ))

  return (
    <div className={styles['latest-bench']}>
      <div className={styles['latest-bench__info']}>
        <p className={styles['latest-bench__title']}>
          Лавочка №{ bench.id }
        </p>

        <div className={styles['latest-bench__street']}>
          <p>
            { bench.street }
          </p>

          <button type={'button'}>
            <Icon name={'location'} />
          </button>
        </div>

        <Button as={Link} appearance={'secondary'} size={isMobile ? 'xs' : 'sm'} href={`/bench/${bench.id}`} className={styles['latest-bench__link-button']}>
          Смотреть
        </Button>
      </div>

      {/* DEBT: Убрать слева отступ в слайдере */}
      <BenchesSlider breakpoints={latestBenchSliderConfig.BREAKPOINTS} slides={slides} slidesPerView={'auto'} />
    </div>
  )
}

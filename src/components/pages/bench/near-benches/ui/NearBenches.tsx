'use client'

import styles from './styles.module.scss'
import { BENCHES_MOCK_DATA } from '@/shared/mocks/benches'
import { BenchesSlider } from '@/components/widgets/benches-slider'
import { nearBenchesConfig } from '@/components/pages/bench/near-benches/config'
import { BenchCard } from '@/components/entities/bench'
import { SwiperSlide } from 'swiper/react'

export const NearBenches = () => {
  const slides = BENCHES_MOCK_DATA.items.map((bench) => (
    <SwiperSlide key={bench.id}>
      <BenchCard bench={bench} />
    </SwiperSlide>
  ))

  return (
    <div className={styles['near-benches']}>
      <h2>Лавочки рядом</h2>

      <div className={styles['near-benches__content']}>
        <BenchesSlider breakpoints={nearBenchesConfig.BREAKPOINTS} slides={slides} />
      </div>
    </div>
  )
}

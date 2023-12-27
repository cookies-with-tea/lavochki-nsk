import { SwiperOptions } from 'swiper/types'
import { Navigation } from 'swiper/modules'

const BREAKPOINTS: SwiperOptions['breakpoints'] = {
  1200: {
    slidesPerView: 3.5,
    spaceBetween: 22,
  },
  768: {
    slidesPerView: 2.5,
    spaceBetween: 16,
  },
  320: {
    slidesPerView: 1.4,
    spaceBetween: 8,
  }
}

const MODULES: SwiperOptions['modules'] = [Navigation]

export const latestBenchSliderConfig = {
  BREAKPOINTS,
  MODULES,
}

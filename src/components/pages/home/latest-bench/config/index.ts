import { SwiperOptions } from 'swiper/types'
import { Navigation } from 'swiper/modules'

const BREAKPOINTS: SwiperOptions['breakpoints'] = {
  1200: {
    slidesPerView: 3.5,
    spaceBetween: 22
  }
}

const MODULES: SwiperOptions['modules'] = [Navigation]

export const latestBenchSliderConfig = {
  BREAKPOINTS,
  MODULES,
}

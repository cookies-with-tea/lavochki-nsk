import styled from '@emotion/styled'
import { SwiperSlide } from 'swiper/react'

export const StyledSlide = styled(SwiperSlide)`
  width: 190px !important;
  height: 190px !important;
  text-align: center;
  
  cursor: pointer;
  
  img {
    border-radius: 20px;
    width: 100%;
    object-fit: cover;
  }
`

import styled from '@emotion/styled'
import { SwiperSlide } from 'swiper/react'

export const StyledSlide = styled(SwiperSlide)`
  height: 450px !important;
  text-align: center;

  img {
    border-radius: 20px;
  }
`

export const StyledNavigation = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;
  top: 50%;
  left: 0;
  z-index: 2;
  transform: translateY(-50%);
  
  .swiper-button-prev,
  .swiper-button-next {
    position: relative;
    width: 9px;
    height: 18px;
  }
  
  .swiper-button-prev {
    left: -40px;
  }
  
  .swiper-button-next {
    right: -40px;
  }
`

export const StyledGradient = styled.div`
  position: absolute;
  top: -1px;
  bottom: 0;
  width: 17%;
  height: 453px;
  z-index: 2;
  pointer-events: none;
  
  &:first-of-type {
    right: -6px;
    background: linear-gradient(
            -90deg,
            rgba(255,255,255,0) -50%,
            rgba(255,252,247,1) 4%,
            rgba(255,255,255,0) 23%
    );
  }
  
  &:last-of-type {
    left: -6px;
    background: linear-gradient(
            90deg,
            rgba(255,255,255,0) -50%,
            rgba(255,252,247,1) 4%,
            rgba(255,255,255,0) 23%
    );
  }
`
import styled from '@emotion/styled'
import { SwiperSlide } from 'swiper/react'

export const StyledSlide = styled(SwiperSlide)`
  width: 190px !important;
  height: 190px !important;
  text-align: center;
  
  img {
    border-radius: 20px;
    width: 100%;
    object-fit: cover;
  }
`

export const StyledNavigation = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .swiper-button-prev,
  .swiper-button-next {
    width: 62px;
    height: 62px;
    transition: all 0.3s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color--primary-dark);
    border-radius: 50%;
  }
  
  .swiper-button-prev {
    position: absolute;
    cursor: pointer;
    left: -32px;
    transform: translateY(-75%);
    z-index: 10;
    top: 58%;
  }

  .swiper-button-next {
    position: absolute;
    cursor: pointer;
    right: -32px;
    transform: translateY(-75%);
    z-index: 10;
    top: 58%;
  }
  
  .swiper-button-disabled {
    visibility: hidden;
    opacity: 0;
  }
`
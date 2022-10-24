import styled from "@emotion/styled";
import {SwiperSlide} from "swiper/react";

export const StyledSlide = styled(SwiperSlide)`
  width: 190px;
  height: 190px;
  text-align: center;
  
  img {
    width: 100%;
    object-fit: cover;
  }
`

export const StyledNavigation = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 2;

  .swiper-button-prev,
  .swiper-button-next {
    transition: all 0.3s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .swiper-button-prev {
    position: relative;
    cursor: pointer;
    left: -32px;
    
    &:first-of-type span {
      transform: rotate(180deg);
    }
  }

  .swiper-button-next {
    position: relative;
    cursor: pointer;
    right: -32px;
  }
  
  .swiper-button-disabled {
    visibility: hidden;
    opacity: 0;
  }
`
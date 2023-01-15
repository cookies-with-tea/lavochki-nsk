import styled from "@emotion/styled";
import {SwiperSlide} from "swiper/react";
import {Button} from "@mui/material";

export const StyledSlide = styled(SwiperSlide)`
  height: 140px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const StyledSlideAddImage = styled(SwiperSlide)`
  height: 140px;
  width: 140px;
  background-color: #333;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  position: relative;

  .MuiBox-root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .plus {
    width: 60px;
    height: 60px;
    position: absolute;
    
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      bottom: 0;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 2px;
      background-color: #000;
    }

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      bottom: 0;
      transform: rotate(90deg);
      width: 100%;
      height: 2px;
      background-color: #000;
      
    }
  }
`

export const StyledClose = styled(Button)`
  padding: 0;
  min-width: 0;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  background-color: #222;
  color: #fff;
  position: absolute;
  left: 4px;
  top: 4px;
`

export const StyledRefresh = styled(Button)`
  padding: 0;
  min-width: 0;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  background-color: #222;
  color: #fff;
  position: absolute;
  right: 4px;
  top: 4px;
`
import styled from '@emotion/styled'
import { Button, Slider } from '@mui/material'

export const StyledZoomControl = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  z-index: 1;
  align-items: center;
`

export const StyledZoomButton = styled(Button)`
  background-color: #f6eddd;
  border: none !important;
  padding: 8px 12px !important;
  min-width: 32px;
  border-radius: 8px !important;

  &:first-of-type {
    .app-icon {
      transform: rotate(90deg);
    }
  }

  &:last-of-type {
    .app-icon {
      transform: rotate(-90deg);
    }
  }

  &:hover {
    background-color: rgba(246, 237, 221, 0.6);
  }
`

export const StyledZoomSlider = styled(Slider)`
  height: 100px;
  color: var(--color--primary-dark);
  -webkit-appearance: slider-vertical;

  .MuiSlider-thumb {
    &.Mui-focusVisible {
      box-shadow: 0 0 0 8px rgba(221, 201, 178, 0.4) !important;
    }
  }

  &:hover {
    .MuiSlider-thumb {
      box-shadow: 0 0 0 8px rgba(221, 201, 178, 0.4) !important;
    }
  }
`
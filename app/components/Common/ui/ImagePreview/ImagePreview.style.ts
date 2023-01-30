import styled from '@emotion/styled'
import Image from 'next/image'
import { BaseButton } from '@/app/styles/common'

export const StyledBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  align-content: center;
  justify-content: center;
  z-index: 1000;
`

export const StyledContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(74, 74, 74, 0.38);
  padding: 20px;
  border-radius: 24px;
  max-width: 1200px;
  width: 100%;
  height: 900px;
`

export const StyledTitle = styled.div`
  font-size: 24px;
  line-height: 108%;
  padding: 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  font-family: 'JetBrains Mono', sans-serif;
  color: #f7f7f7;
  border-bottom: 1px solid #f7f7f7;
  text-align: center;
  margin-bottom: 18px;
`

export const StyledImageWrapper = styled.div`
  text-align: center;
  padding: 0 60px;
  
  span {
    width: 100% !important;
    height: 600px !important;
  }
`

export const StyledImage = styled(Image)`
  max-width: 100% !important;
  width: 100% !important;
  height: 600px !important;
`

export const StyledClose = styled(BaseButton)`
  color: #fff !important;
  display: flex;
  margin-left: auto;
  cursor: pointer;
  border: none !important;
`
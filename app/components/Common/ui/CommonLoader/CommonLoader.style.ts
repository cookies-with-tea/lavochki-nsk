import styled from '@emotion/styled'

export const StyledLoader = styled.div`
  flex: 1 1 auto;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const StyledRing = styled.div`
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  animation: ring 2s linear infinite;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px #6d4206c9;
  }
  
  @keyframes ring {
    0% {
      transform: rotate(0deg);
      box-shadow: 1px 5px 2px #e65c00;
    }
    50% {
      transform: rotate(180deg);
      box-shadow: 1px 5px 2px #18b201;
    }
    100% {
      transform: rotate(360deg);
      box-shadow: 1px 5px 2px #0456c8;
    }
  }
`

export const StyledText = styled.span`
  color: #737373;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 24px;
  animation: text 3s ease-in-out infinite;
  
  @keyframes text {
    50% {
      color: #f6eddd;
    }
  }
`

import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const StyledLoginButton = styled(Button)`
  padding: 0 !important;
  margin: 0 !important;
  border-radius: 50%;
  width: 62px;
  height: 62px;
  display: flex;
  align-items: center;
  border: none !important;
  transition: width 0.2s ease-in-out;
  position: absolute;
  right: 0;

  .app-icon {
    margin-left: auto;
    position: absolute;
    right: -2px;
    top: -2px;
    width: 62px;
    height: 62px;
    background-color: var(--color--primary);
    border-radius: 50%;
  }
  
  .text {
    font-size: 16px;
    line-height: 18px;
    text-transform: none;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-15%, -50%);
    transition: visibility 0.15s linear, opacity 0.15s linear, transform 0.15s linear;
  }
`

export const StyledTelegramWrapper = styled.div`
  width: 62px;
  height: 62px;
  position: relative;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    width: 157px;
    border: 2px solid var(--color--primary-dark);
    border-radius: 100px;
    
    .MuiButton-root {
      .text {
        visibility: visible;
        right: 0;
        top: 50%;
        opacity: 1;
        transform: translate(-155%, -50%);
      }
    }
  }
`
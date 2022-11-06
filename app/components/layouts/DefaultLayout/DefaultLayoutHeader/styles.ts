import styled from "@emotion/styled";
import {Button} from "@mui/material";
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login';

export const StyledHeader = styled.header`
  background-color: var(--color--primary);
  margin-bottom: 62px;
  padding: 15px 0;
`

export const StyledTelegram = styled(Button)`
  position: relative;
  z-index: 1;
  background-color: var(--color--primary);
  border-radius: 50%;
  border: none !important;
`

export const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledHomeLink = styled.a`
  border: none;
  background: none;
`

export const StyledAvatarButton = styled(Button)`
  background: none !important;
  border: none !important;
  padding: 0 !important;
`


export const StyledHuitaTelegramButton = styled.div`
  width: 62px;
  opacity: 1;
  position: relative;
  right: 400px;
  height: 62px;
  border-radius: 50%;
`
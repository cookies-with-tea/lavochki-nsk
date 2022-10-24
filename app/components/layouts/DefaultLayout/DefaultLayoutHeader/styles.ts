import styled from "@emotion/styled";
import {Button} from "@mui/material";

export const StyledHeader = styled.header`
  background-color: var(--color--primary);
  margin-bottom: 62px;
`

export const StyledTelegram = styled.div`
  position: relative;
  z-index: 1;
  background-color: var(--color--primary);
  border-radius: 50%;
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
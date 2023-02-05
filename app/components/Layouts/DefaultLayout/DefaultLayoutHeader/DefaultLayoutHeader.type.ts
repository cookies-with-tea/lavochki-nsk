import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const StyledHeader = styled.header`
  background-color: var(--color--primary);
  margin-bottom: 62px;
  padding: 15px 0;
`

export const StyledHeaderWrapper = styled.div`
  max-width: 1360px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: auto;
  padding: 0 15px;
`

export const StyledHomeLink = styled.a`
  border: none;
  background: none;
  padding: 0;
  margin-right: 24px;
`

export const StyledAvatarButton = styled(Button)`
  background: none !important;
  border: none !important;
  padding: 0 !important;
`

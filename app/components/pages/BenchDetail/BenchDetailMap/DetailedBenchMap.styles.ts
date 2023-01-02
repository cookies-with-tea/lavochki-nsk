import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const StyledWatchOnTheMap = styled(Button)`
  font-size: 26px !important;
  line-height: 20px;
  color: var(--color--primary-dark);
  text-decoration: underline;
  margin-bottom: 27px;
  border: none !important;
  padding: 0 !important;
  
  &:hover {
    text-decoration: underline;
  }
`

export const StyledCoords = styled.div`
    font-size: 20px;
    line-height: 20px;
    margin-top: 24px;
    
    color: var(--color--light-secondary);
`

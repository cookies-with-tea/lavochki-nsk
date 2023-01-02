import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  .name {
    font-size: 20px;
    line-height: 24px;
    color: var(--color--primary-dark);
    margin-bottom: 4px;
  }
  
  .date {
    font-size: 16px;
    line-height: 18px;
    color: var(--color--light-secondary);
  }
`

export const StyledHeart = styled(Button)`
  min-width: 20px !important;
  padding: 0 !important;
  right: 0;
  border: none !important;
`

export const StyledHeartWrapper = styled.div`
  span {
    margin-left: 4px;
    font-size: 18px;
    line-height: 16px;
    color: var(--color--light-secondary);
  }
`

export const StyledText = styled.div`
    font-size: 18px;
  line-height: 24px;
  max-width: 1250px;
  color: var(--color--primary-dark-secondary);
  margin-bottom: 10px;
`

export const StyledAnswerButton = styled(Button)`
  padding: 0 !important;
  border: none !important;
`
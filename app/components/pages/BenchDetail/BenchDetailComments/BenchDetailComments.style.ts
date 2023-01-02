import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'

export const StyledOpenCommentInputButton = styled(Button)`
  background-color: var(--color--primary-secondary);
  padding: 0;
  color: var(--color--light-secondary);
  font-size: 18px;
  line-height: 30px;
  width: 100%;
  border-radius: 16px !important;
  justify-content: left !important;
  text-align: left !important;
  margin-bottom: 24px;
`

export const StyledCommentInput = styled(TextField)`
  color: var(--color--light-secondary);
  background-color: var(--color--primary-secondary);
  padding: 0;
  font-size: 26px;
  line-height: 30px;
`

export const StyledSendCommentWrapper = styled.div`
  background-color: var(--color--primary-secondary);
  padding: 28px 24px 24px;
  
  &.benchDetail-send-comment {
    margin-bottom: 24px;
  }
  
  &.benchDetail-send-answer {
    margin-left: 84px;
  }
`

export const StyledHeading = styled.h3`
  font-size: 36px;
  line-height: 50px;
  
  span {
    margin-left: 16px;
    font-size: 26px;
    line-height: 26px;
    color: var(--color--light-secondary);
  }
`
import React, { ChangeEvent, FC, ReactElement } from 'react'
import {
  StyledCommentInput,
  StyledSendCommentWrapper
} from '@/app/components/pages/BenchDetail/BenchDetailComments/BenchDetailComments.style'
import { Box, Button, FormControl } from '@mui/material'
import CommonIcon from '@/app/components/Common/CommonIcon/CommonIcon'

interface IProps {
    className?: string
    authorId?: string
    commentChange: (event: ChangeEvent<HTMLInputElement>) => void
    commentSend: () => void
}

const BenchDetailSendComment: FC<IProps> = (
  { commentChange, commentSend, authorId, className }
): ReactElement => {
  const stylesWrapper = `
  ${authorId 
    ? 'benchDetail-send-answer'
    : 'benchDetail-send-comment'} ${className}
  `

  return (
    <StyledSendCommentWrapper className={stylesWrapper} >
      <Box component={'form'} autoComplete="off">
        <FormControl className={'w-100 mb-12'}>
          <StyledCommentInput
            focused
            multiline
            rows={4}
            onChange={commentChange}
          />
        </FormControl>
      </Box>
      <div className="d-f ai-c w-100 jc-sb">
        <CommonIcon name={'image'} width={32} height={32} />
        <Button color={'primary'} onClick={commentSend}>Отправить</Button>
      </div>
    </StyledSendCommentWrapper>
  )
}

export default BenchDetailSendComment
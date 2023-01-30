import React, { ChangeEvent, FC, ReactElement, useState } from 'react'
import { Avatar, Button, Popover } from '@mui/material'
import CommonIcon from '@/app/components/Common/ui/CommonIcon/CommonIcon'
import {
  StyledAnswerButton,
  StyledHeart, StyledHeartWrapper, StyledInfo, StyledReportButton,
  StyledText
} from
  '@/app/components/pages/BenchDetail/BenchDetailComment/BenchDetailComment.style'
import Image from 'next/image'
import Profile from '@/public/Avatar.png'
import BenchDetailSendComment
  from '@/app/components/pages/BenchDetail/BenchDetailComment/BenchDetailCommentSend'
import { CommentType, CreateCommentType } from '@/app/types/comment.type'
import CommentService from '@/app/services/Comment/CommentService'
import { useMutation } from 'react-query'

interface IProps {
    benchId: string
    comment: CommentType
    updateData: () => void
    reportDialogToggleVisible: () => void
}

const createComment = async (payload: CreateCommentType): Promise<unknown> =>
  await CommentService.create(payload)

const BenchDetailComment: FC<IProps> = ({ 
  benchId,
  comment,
  updateData,
  reportDialogToggleVisible
}): ReactElement => {
  const [reportElement, setReportElement] =
    useState<HTMLButtonElement | null>(null)

  const [answer, setAnswer] = useState({
    visible: false,
    content: '',
    parentId: ''
  })

  const { mutateAsync } = useMutation(
    'create comment',
    async (payload: CreateCommentType) => createComment(payload),
    {
      onSuccess: () => {
        updateData()
      }
    }
  )

  const isReportPopoverVisible = Boolean(reportElement)
  const reportId = isReportPopoverVisible ? 'report-popover' : undefined

  const handleAnswerVisibleToggle = (): void => {
    setAnswer({
      ...answer,
      visible: !answer.visible
    })
  }

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAnswer({
      ...answer,
      content: event.target.value
    })
  }

  const handleReportPopoverShow = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setReportElement(event.currentTarget)
  }
  
  const handleReportDialogVisibleToggle = (): void => {
    reportDialogToggleVisible()
  }

  const handleReportPopoverClose = (): void => {
    setReportElement(null)
  }

  const handleAnswerSend = async (): Promise<void> => {
    const payload = {
      bench_id: benchId,
      content: answer.content,
      parent_id: comment.id
    }

    await mutateAsync(payload)
  }

  return (
    <div className={`mb-20 ${comment.parent_id ? 'ml-84' : ''}`}>
      <div className={'d-f ai-c mb-16'}>
        <Avatar sx={{ width: 64, height: 64, marginRight: '16px' }}>
          <Image 
            src={Profile}
            alt={'profile'}
            width={'100%'}
            height={'100%'}
            objectFit={'cover'}
          />
        </Avatar>
        <StyledInfo>
          <p className="name">Аркадий</p>
          <p className="date">10 ноября 2022, 17:50</p>
        </StyledInfo>
      </div>
      <StyledText>
        { comment.content }
      </StyledText>
      <div className="d-f ai-c jc-sb w-100 mb-16">
        <div className={'d-f ai-c p-relative'}>
          <StyledAnswerButton
            className={'mr-16'}
            color={'primary'}
            onClick={handleAnswerVisibleToggle}
          >
            Ответить
          </StyledAnswerButton>
          <Button
            sx={{
              padding: 0,
              border: 'none !important',
              marginRight: '10px'
            }}
            color={'primary'}
            aria-describedby={reportId}
            onClick={handleReportPopoverShow}
          >
            <CommonIcon name={'more'} width={24} height={24} />
          </Button>

          <Popover
            id={reportId}
            open={isReportPopoverVisible}
            anchorEl={reportElement}
            onClose={handleReportPopoverClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
          >
            <StyledReportButton
              color={'primary'}
              onClick={handleReportDialogVisibleToggle}
            >
              Пожаловаться
            </StyledReportButton>
          </Popover>
        </div>
        <StyledHeartWrapper className="d-f ai-c">
          <StyledHeart color={'primary'} disableRipple>
            <CommonIcon name={'heart'} width={20} height={20} />
          </StyledHeart>
          <span>1</span>
        </StyledHeartWrapper>
      </div>

      {
        answer.visible
        && <BenchDetailSendComment
          commentChange={handleAnswerChange}
          commentSend={handleAnswerSend} 
          authorId={comment.author_id }
        />
      }

      {
        comment.nested_comments
        && comment.nested_comments.map((comment) =>
          <BenchDetailComment
            key={comment.id}
            benchId={benchId}
            comment={comment}
            updateData={updateData}
            reportDialogToggleVisible={handleReportDialogVisibleToggle}
          />
        )
      }

    </div>
  )
}

export default BenchDetailComment
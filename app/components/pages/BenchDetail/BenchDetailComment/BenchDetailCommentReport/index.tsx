import { FC, ReactElement, ChangeEvent, useState } from 'react'
import {
  Button, Dialog, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { CreateReportCommentType } from '@/app/types/report.type'
import ReportService from '@/app/services/Report/ReportService'
import { useMutation } from 'react-query'

interface IProps {
  isOpen: boolean
  onClose: () => void
  commentId: string
}

const createReport = async (
  payload: CreateReportCommentType
): Promise<unknown> => (
  await ReportService.create(payload)
)

const BenchDetailCommentReport: FC<IProps> = ({
  commentId,
  isOpen,
  onClose
}): ReactElement => {
  const [currentReason, setCurrentReason] = useState('cheats')
  const [currentSelect, setCurrentSelect] = useState('cheats')

  const { mutateAsync } = useMutation(
    'create report',
    async (payload: CreateReportCommentType) => createReport(payload)
  )

  const handleReasonSelect  = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentSelect((event.target as HTMLInputElement).value)
  }

  const handleReasonTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCurrentReason(e.target.value)
  }

  const handleReportSend = async (): Promise<void> => {
    const payload = {
      cause: currentReason,
      comment_id: commentId
    }

    await mutateAsync(payload)
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Причина жалобы</DialogTitle>
      <FormControl sx={{ marginBottom: '24px' }}>
        <RadioGroup
          defaultValue="cheats"
          name="reason-buttons-group"
          value={currentSelect}
          onChange={handleReasonSelect}
        >
          <FormControlLabel value="cheats" control={<Radio />} label="Использование читов" />
          <FormControlLabel value="kitchen" control={<Radio />} label="Кража с кухни" />
          <FormControlLabel value="cookies" control={<Radio />} label="Доедание последних печенек" />
          <FormControlLabel value="other" control={<Radio />} label="Другое" />
        </RadioGroup>
      </FormControl>
      {
        currentSelect === 'other' && (
          <TextField
            multiline
            value={currentReason}
            placeholder="Enter a reason..."
            onChange={(e) => handleReasonTextChange(e)} minRows={2} maxRows={4}
            sx={{ marginBottom: '24px' }}
          />
        )
      }
      <Button color={'primary'} onClick={handleReportSend}>Отправить</Button>
    </Dialog>
  )
}

export default BenchDetailCommentReport
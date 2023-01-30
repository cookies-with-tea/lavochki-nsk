import { Alert, Snackbar } from '@mui/material'
import React, { FC, ReactElement } from 'react'
import { NoSsr } from '@mui/base'

interface IProps {
    isOpen: boolean
    onClose: () => void
    message?: string
}

const CommonSnackbar: FC<IProps> = ({ 
  isOpen,
  message,
  onClose
}): ReactElement => {
  return (
    <NoSsr>
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Alert severity="error">{message}</Alert>
      </Snackbar>
    </NoSsr>

  )
}

export default CommonSnackbar
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core'
import React, { FC, memo } from 'react'

type Props = {
  open: boolean
  handleCloseDialog(): void
  handleDelete(): void
}

export const ConfirmMessage: FC<Props> = memo(
  ({ open, handleCloseDialog, handleDelete }) => {
    return (
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            The post will be delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleDelete} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)

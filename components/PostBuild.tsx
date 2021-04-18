import React, { FC, memo, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import { useDispatch } from 'react-redux'
import { Box, Button, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
)

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

type Props = {
  postTitle: string
  postBody: string
  open: boolean
  postHandler(): void
  handleClose(): void
  setPostTitle(arg: string): void
  setPostBody(arg: string): void
}

export const PostBuild: FC<Props> = memo(({
  setPostTitle,
  setPostBody,
  postTitle,
  postBody,
  open,
  handleClose,
  postHandler,
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Add New Post
          </Typography>
          <Button autoFocus color='inherit' onClick={postHandler}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Box p={2} pr={4} pl={4} display='flex' flexDirection='column'>
        <TextField
          id='add-title'
          label='Add title of the post'
          margin='dense'
          variant='outlined'
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
        />
        <TextField
          id='outlined-multiline-static'
          label='Add text of the post'
          margin='dense'
          multiline
          rows={4}
          rowsMax={8}
          variant='outlined'
          value={postBody}
          onChange={e => setPostBody(e.target.value)}
        />
      </Box>
    </Dialog>
  )
}
)
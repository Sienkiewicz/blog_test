import { Box, Button, TextField } from '@material-ui/core'
import React, { FC, memo, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addPost } from '../redux/userSlice'

type Props = {
  handleClickOpen(): void
}

export const AddPostButton: FC<Props> = memo(({ handleClickOpen }) => {

  return (
    <>
      <Box p={2}>
        <Button
          variant='outlined'
          color='default'
          fullWidth
          onClick={handleClickOpen}
        >
          Add new Post
        </Button>
      </Box>
    </>
  )
}
)
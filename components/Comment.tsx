import { Divider, Grid, Typography } from '@material-ui/core'
import React, { FC, memo } from 'react'
import { CommentType } from '../redux/userSlice'

type Props = {
  comment: CommentType
}

export const Comment: FC<Props> = memo(({comment}) => {
  return (
    <Grid item xs={12}>
      <Typography variant='body1' color='initial'>
        {comment.bodyComment}
      </Typography>
      <Divider />
    </Grid>
  )
})

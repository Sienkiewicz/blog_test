import React, { FC, memo, useCallback } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { blueGrey } from '@material-ui/core/colors'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { deletePost } from '../redux/userSlice'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { Grid } from '@material-ui/core'
import { cutText } from '../src/utils/help'
import { PostType } from '../src/utils/types'
import { ConfirmMessage } from './ConfirmMessage'

const flexBoxGrow = {
  display: 'flex',
  flexGrow: 1,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    link: {
      ...flexBoxGrow,
      transition: 'background 0.3s',
      '&:hover': {
        backgroundColor: blueGrey[100],
      },
    },
    cardContent: {
      ...flexBoxGrow,
      flexDirection: 'column',
      padding: theme.spacing(2),
      '& :first-child': {
        flexGrow: 1,
      },
    },
  })
)

type Props = {
  post: PostType
  openEditPostPopUp(id: number): void
}

export const Post: FC<Props> = memo(({ post, openEditPostPopUp }) => {
  const [open, setOpen] = React.useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const pLength = post.comments?.length

  const handleClickOpenDialog = useCallback(() => {
    setOpen(true)
    setAnchorEl(null)
  }, [setOpen, setAnchorEl])

  const handleCloseDialog = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    },
    [setAnchorEl]
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const editHandler = useCallback(() => {
    openEditPostPopUp(post.id)
    handleClose()
  }, [handleClose, openEditPostPopUp, post.id])

  const handleDelete = useCallback(() => {
    dispatch(deletePost(post.id))
    setOpen(false)
  }, [setAnchorEl, dispatch, setOpen])

  return (
    <>
      <ConfirmMessage
        open={open}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root}>
          <CardHeader
            avatar={<Avatar aria-label='author: Piotr Sienkiewicz'>P</Avatar>}
            action={
              <IconButton
                aria-label='settings'
                aria-haspopup='true'
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={post.title}
            subheader={post.date}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={editHandler}>Edit</MenuItem>
            <MenuItem onClick={handleClickOpenDialog}>Delete</MenuItem>
            <Link href={`/post/${post.id}`}>
              <a>
                <MenuItem onClick={handleClose}>Show</MenuItem>
              </a>
            </Link>
          </Menu>
          <Link href={`/post/${post.id}`}>
            <a className={classes.link}>
              <div className={classes.cardContent}>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='div'
                >
                  {cutText(post.body)}
                </Typography>
                <Typography align='right' color='primary'>
                  {!pLength
                    ? 'live comment'
                    : `${pLength} ${pLength === 1 ? 'comment' : 'comments'}`}
                </Typography>
              </div>
            </a>
          </Link>
        </Card>
      </Grid>
    </>
  )
})

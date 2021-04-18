import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { MainLayout } from '../layout/MainLayout'
import Typography from '@material-ui/core/Typography'
import { Box, Container, Grid, TextField, Button } from '@material-ui/core'
import { addComment } from '../../redux/userSlice'
import { Comment } from '../../components/Comment'

const AMOUNT_OF_SYMBOLS = 2

export default function Post() {
  const [comment, setComment] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const dispatch = useDispatch()
  const { query } = useRouter()
  const [post] = useSelector((state: RootState) =>
    state.user.posts.filter(p => p.id === +query.id)
  )
  const isValid = comment.length < AMOUNT_OF_SYMBOLS

  const divRef = useRef()
  const inputRef = useRef()

  const onFocusHandler = useCallback(() => {
    setIsFocus(true)
  }, [setIsFocus])
  const onBlurHandler = useCallback(
    (e: MouseEvent) => {
      const path = e.composedPath()
      const pathIncludes = (ref: EventTarget) => {
        return path.includes(ref)
      }

      if (pathIncludes(divRef.current) || pathIncludes(inputRef.current)) return
      setIsFocus(false)
      setComment('')
    },
    [setIsFocus, setComment]
  )

  const addCommentHandler = useCallback(() => {
    dispatch(addComment({ id: post.id, text: comment }))
    setIsFocus(false)
    setComment('')
  }, [dispatch, setIsFocus, setComment, comment, post.id])

  useEffect(() => {
    document.body.addEventListener('click', onBlurHandler)
    return () => {
      document.body.removeEventListener('click', onBlurHandler)
    }
  }, [])

  return (
    <MainLayout title={post.title}>
      <Container maxWidth='md'>
        <Box p={3}>
          <Typography variant='h4' color='initial' align='center'>
            {post.title}
          </Typography>
          <Typography variant='body1' color='initial'>
            {post.body}
          </Typography>
          <Box py={3}>
            <TextField
              ref={inputRef}
              fullWidth
              id='live-comment'
              label='Live a comment'
              error={isFocus && isValid}
              helperText={
                isFocus &&
                isValid &&
                `write at least ${AMOUNT_OF_SYMBOLS} symbols`
              }
              value={comment}
              onChange={e => setComment(e.target.value)}
              variant='outlined'
              multiline
              rowsMax={10}
              onFocus={onFocusHandler}
            />
            <Box pt={1} display='flex' justifyContent='flex-end'>
              {isFocus && (
                <div>
                  <Button variant='text' color='default'>
                    cancel
                  </Button>
                  <Button
                    ref={divRef}
                    variant='contained'
                    color='primary'
                    onClick={addCommentHandler}
                    disabled={isFocus && isValid}
                  >
                    add comment
                  </Button>
                </div>
              )}
            </Box>
          </Box>
          <Grid container spacing={2}>
            {post.comments &&
              post.comments.map(c => <Comment key={c.id} comment={c} />)}
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  )
}

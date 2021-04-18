import { Container, Grid, Typography } from '@material-ui/core'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddPostButton } from '../components/AddPostButton'
import { Post } from '../components/Post'
import { PostBuild } from '../components/PostBuild'
import { RootState } from '../redux/store'
import { addPost, editPost } from '../redux/userSlice'
import { MainLayout } from './layout/MainLayout'

export default function Home() {
  const posts = useSelector((state: RootState) => state.user.posts)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [postId, setPostId] = useState<number | null>(null)

  const handleClickOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const resetFn = useCallback(() => {
    setPostTitle('')
    setPostBody('')
    setOpen(false)
  }, [setOpen, setPostBody, setPostTitle])

  const addPostHandler = useCallback(() => {
    dispatch(addPost({ title: postTitle, body: postBody }))
    resetFn()
  }, [dispatch, resetFn, postTitle, postBody, addPost])

  const openEditPostPopUp = useCallback(
    (id: number) => {
      const post = posts.find(post => post.id === id)
      setPostTitle(post.title)
      setPostBody(post.body)
      setOpen(true)
      setPostId(id)
    },
    [setPostId, setOpen, setPostBody, setPostTitle, posts]
  )

  const editPostHandler = useCallback(() => {
    dispatch(editPost({ id: postId, title: postTitle, body: postBody }))
    resetFn()
    setPostId(null)
  }, [setPostId, resetFn, dispatch, editPost, postId, postTitle, postBody])

  const postHandler = postId ? editPostHandler : addPostHandler

  return (
    <MainLayout title='My blog'>
      <Container maxWidth='md'>
        <AddPostButton handleClickOpen={handleClickOpen} />
        <PostBuild
          setPostTitle={setPostTitle}
          setPostBody={setPostBody}
          postTitle={postTitle}
          postBody={postBody}
          open={open}
          handleClose={handleClose}
          postHandler={postHandler}
        />

        {posts.length ? (
          <Grid container spacing={2} justify='center'>
            {posts.map(post => (
              <Post
                key={post.id}
                post={post}
                openEditPostPopUp={openEditPostPopUp}
              />
            ))}
          </Grid>
        ) : (
          <Typography variant='h6' align='center' color='initial'>
            Write your first post
          </Typography>
        )}
      </Container>
    </MainLayout>
  )
}

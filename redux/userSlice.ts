import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentType, PostType } from '../src/utils/types'

const initialState = {
  author: 'Piotr Sienkiewicz',
  isLoading: false,
  posts: [
    {
      date: new Date().toLocaleDateString(),
      id: 1618695776139,
      title: 'First post',
      body:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'",
    },
    {
      date: new Date().toLocaleDateString(),
      id: 1618600776139,
      title: 'Second post',
      body: 'It is a long established fact',
    },
    {
      date: new Date().toLocaleDateString(),
      id: 1618600476139,
      title: 'Third post',
      body:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'",
    },
  ] as PostType[],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, { payload }: PayloadAction<PostType>) => {
        state.isLoading = true
        state.posts.push(payload)
        state.isLoading = false
      },
      prepare: ({ title, body }: { title: string; body: string }) => ({
        payload: {
          date: new Date().toLocaleDateString(),
          id: new Date().getTime(),
          title,
          body,
        },
      }),
    },
    deletePost: (state, { payload }: PayloadAction<number>) => {
      state.isLoading = true
      state.posts = state.posts.filter(post => post.id !== payload)
      state.isLoading = false
    },
    editPost: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number
        title: string
        body: string
      }>
    ) => {
      const index = state.posts.findIndex(post => post.id === payload.id)
      if (index !== -1)
        state.posts[index] = { ...state.posts[index], ...payload }
    },
    addComment: {
      reducer: (
        state,
        { payload }: PayloadAction<{ id: number; comment: CommentType }>
      ) => {
        const index = state.posts.findIndex(post => post.id === payload.id)
        if (index !== -1) {
          const post = state.posts[index]
          if (!('comments' in post)) {
            post.comments = [payload.comment]
            return
          }
          post.comments.unshift(payload.comment)
        }
      },
      prepare: ({ id, text }: { id: number; text: string }) => ({
        payload: {
          id,
          comment: {
            id: new Date().getTime(),
            bodyComment: text,
          },
        },
      }),
    },
  },
})

export const { addPost, deletePost, editPost, addComment } = userSlice.actions

export default userSlice.reducer

export type InitialStateUserType = typeof initialState

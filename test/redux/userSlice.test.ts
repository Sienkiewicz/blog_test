import { store } from '../../redux/store'
import Reducer, {
  addComment,
  addPost,
  deletePost,
  editPost,
} from '../../redux/userSlice'
import { PostType } from '../../src/utils/types'

let initState: { author: string; isLoading: boolean; posts: PostType[] }

beforeEach(() => {
  initState = {
    author: 'Henry Sienkiewicz',
    isLoading: false,
    posts: [
      {
        date: new Date().toLocaleDateString(),
        id: 1,
        title: 'First post',
        body: 'Body of the first post',
      },
      {
        date: new Date().toLocaleDateString(),
        id: 2,
        title: 'Second post',
        body: 'Body of the second post',
      },
      {
        date: new Date().toLocaleDateString(),
        id: 3,
        title: 'Third post',
        body: 'Body of the third post',
      },
    ] as PostType[],
  }
})

describe('userSlice', () => {
  test('The post should be added', () => {
    let posts = store.getState().user.posts
    const initialPostsCount = posts.length

    store.dispatch(
      addPost({ title: 'Mock post', body: 'It is a long established fact' })
    )
    posts = store.getState().user.posts
    expect(posts.length).toBeGreaterThan(initialPostsCount)

    const newPost = posts.find(post => post.title === 'Mock post')
    expect(newPost.body).toBe('It is a long established fact')
    expect(newPost.id).toBeTruthy()
    expect(newPost.date).toBeTruthy()
    expect(newPost).not.toHaveProperty('comments')
  })

  test('The post should be edited', () => {
    const mockPayload = {
      id: 1,
      title: 'First post!!!',
      body: 'Body of the first post was changed',
    }
    const newState = Reducer(initState, editPost(mockPayload))
    const post = newState.posts.find(post => post.id === 1)

    expect(post.title).toBe(mockPayload.title)
    expect(post.body).toBe(mockPayload.body)
  })

  test('The comment should be added', () => {
    const mockPayload = {
      id: 1,
      text: 'great',
    }

    const newState = Reducer(initState, addComment(mockPayload))
    const post = newState.posts.find(post => post.id === 1)

    expect(post).toHaveProperty('comments')
    expect(post.comments[0].bodyComment).toBe('great')
  })

  test('The post should be delete', () => {
    const newState = Reducer(initState, deletePost(1))
    const post = newState.posts.find(post => post.id === 1)

    expect(post).toBeUndefined()
    // expect(post.comments[0].bodyComment).toBe('great')
  })
})

import React from 'react'
import { fireEvent, render } from '../../src/utils/test-utils'
import { PostType } from '../../src/utils/types'
import { Post } from '../../components/Post'

describe('Post', () => {
  let expectedProps: JSX.IntrinsicAttributes & {
    post: PostType
    openEditPostPopUp(id: number): void
  } & { children?: React.ReactNode }

  beforeEach(() => {
    expectedProps = {
      post: {
        date: new Date().toLocaleDateString(),
        id: 1618695776139,
        title: 'First post',
        body: 'It is a long established fact',
      },
      openEditPostPopUp: jest.fn(),
    }
  })

  test('should render date, title, body and message "LIVE COMMENT"', () => {
    const { getByText } = render(<Post {...expectedProps} />)
    const post = expectedProps.post

    expect(getByText(post.date)).toBeVisible()
    expect(getByText(post.title)).toBeVisible()
    expect(getByText(post.body)).toBeVisible()
    expect(getByText('live comment')).toBeVisible()
  })

  test('message "1 COMMENT" should be rendered', () => {
    expectedProps.post.comments = [{ id: 1, bodyComment: 'great' }]
    const { getByText } = render(<Post {...expectedProps} />)

    expect(getByText('1 comment')).toBeVisible()
  })

  test('the message "2 COMMENT" should be rendered', () => {
    expectedProps.post.comments = [
      { id: 1, bodyComment: 'great' },
      { id: 2, bodyComment: 'great' },
    ]
    const { getByText } = render(<Post {...expectedProps} />)

    expect(getByText('2 comments')).toBeVisible()
  })

  test('the icon of menu bar should be rendered', () => {
    const { getByLabelText } = render(<Post {...expectedProps} />)

    expect(getByLabelText('settings')).toBeVisible()
  })

  test('the menu bar should be rendered with DELETE, EDIT and SHOW, when clicked icon', () => {
    const { getByText, getByLabelText } = render(<Post {...expectedProps} />)
    const menuIcon = getByLabelText('settings')

    fireEvent.click(menuIcon)
    expect(getByText('Delete')).toBeVisible()
    expect(getByText('Edit')).toBeVisible()
    expect(getByText('Show')).toBeVisible()
  })

  test('', () => {
    const { getByText, getByLabelText } = render(<Post {...expectedProps} />)
    const menuIcon = getByLabelText('settings')

    fireEvent.click(menuIcon)
    expect(getByText('Delete')).toBeVisible()
    expect(getByText('Edit')).toBeVisible()
    expect(getByText('Show')).toBeVisible()
  })
})

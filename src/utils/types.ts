export type CommentType = {
  id: number
  bodyComment: string
}

export type PostType = {
  id: number
  title: string
  body: string
  date: string
  comments?: CommentType[]
}



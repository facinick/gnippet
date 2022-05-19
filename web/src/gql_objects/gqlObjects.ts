import { Comment, Snippet, User } from "types/graphql"

type FullSnippetAuthor = Pick<User, 'username'>

export type _Author = {
  author: FullSnippetAuthor
}

export type _Comment = Pick<Comment, 'id' | 'body' | 'createdAt' | 'score' | 'parentCommentId' >

export type _Snippet = Pick<Snippet, 'id' | 'title' | 'body' | 'createdAt' | 'score' | 'activity'> & _Author

export type _SnippetWithComments = Pick<Snippet, 'id' | 'title' | 'body' | 'createdAt' | 'score' | 'activity'>
& {
  comments: Array<_Comment & _Author>
}
& _Author
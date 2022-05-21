import { Comment, Snippet, User, Vote } from "types/graphql"

type FullSnippetAuthor = Pick<User, 'username'>

export type _Author = {
  author: FullSnippetAuthor
}

export type _Comment = Pick<Comment, 'id' | 'body' | 'createdAt' | 'score' | 'parentCommentId' | 'activity' > & _Author

export type _Snippet = Pick<Snippet, 'id' | 'title' | 'body' | 'createdAt' | 'score' | 'activity'> & _Author

export type _Vote = Pick<Vote, 'id' | 'userId' | 'snippetId' | 'commentId' | 'value' | 'entityType'>

export type _Votes = {
  votes: Array<_Vote>
}

export type _SnippetWithVotes = Pick<Snippet, 'id' | 'title' | 'body' | 'createdAt' | 'score' | 'activity'> & _Author & _Votes

export type _SnippetWithComments = Pick<Snippet, 'id' | 'title' | 'body' | 'createdAt' | 'score' | 'activity'>
& {
  comments: Array<_Comment & _Author>
}
& _Author
import type { CommentsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Comment from 'src/components/Comment'
import Stack from '@mui/material/Stack'

export const QUERY = gql`
  query CommentsQuery($snippetId: Int!) {
    comments(snippetId: $snippetId) {
      id
      body
      score
      activity
      authorId
      author {
        username
      }
      createdAt
      parentCommentId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ comments, snippetId }: CellSuccessProps<CommentsQuery>) => {
  return (
    <>
      <Stack spacing={5}>
      {comments.map((comment) => {
          return <Comment
            snippetId={snippetId}
            key={comment.id}
            comment={comment}
            />
        })}
      </Stack>
    </>
  )
}

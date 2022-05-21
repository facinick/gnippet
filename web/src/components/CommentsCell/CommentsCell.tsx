import type { FindSnippetQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Comment from 'src/components/Comment'
import Stack from '@mui/material/Stack'
import { useApolloClient } from '@apollo/client'
import { USER_DATA_QUERY } from "src/pages/Queries/queries";
import { useAuth } from '@redwoodjs/auth';
import { _SnippetWithComments } from 'src/gql_objects/gqlObjects'

export const QUERY = gql`
  query SnippetsCommentsQuery($snippetId: Int!) {
    snippet(id: $snippetId) {
      id
      comments(input: { orderBy: { createdAt: desc }} ) {
        id
        body
        score
        author {
          username
        }
        createdAt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No Comments... Such Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  snippet,
  snippetId,
}: { snippet: _SnippetWithComments, snippetId: number }) => {
  return (
    <>
      <Stack spacing={5}>
        {snippet.comments.map((comment) => {
          return (
            <Comment snippetId={snippetId} key={comment.id} comment={comment} />
          )
        })}
      </Stack>
    </>
  )
}

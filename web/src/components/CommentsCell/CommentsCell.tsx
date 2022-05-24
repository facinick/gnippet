import type { FindSnippetQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Comment from 'src/components/Comment'
import Stack from '@mui/material/Stack'
import { useApolloClient } from '@apollo/client'
import { USER_DATA_QUERY } from "src/pages/Queries/queries";
import { useAuth } from '@redwoodjs/auth';
import { _SnippetWithComments } from 'src/gql_objects/gqlObjects'
import Divider from '@mui/material/Divider'

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

  const numberOfSnippets = snippet.comments.length
  let isLastComment: boolean = false
  let renderDivider: boolean = false

  return (
    <>
      <Stack spacing={5}>
        {snippet.comments.map((comment, index) => {
          isLastComment = (index === numberOfSnippets - 1) ? true : false
          renderDivider = !isLastComment
          return (
            <>
            <Comment snippetId={snippetId} key={comment.id} comment={comment} />
            { renderDivider && <Divider /> }
            </>
          )
        })}
      </Stack>
    </>
  )
}

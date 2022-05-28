import type { CellFailureProps } from '@redwoodjs/web'
import Comment from 'src/components/Comment'
import Stack from '@mui/material/Stack'
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

  const numberOfComments = snippet.comments.length
  let isLastComment: boolean = false
  let renderDivider: boolean = false
  const noComments: boolean = numberOfComments === 0
  const yesComments: boolean = !noComments
  return (
    <>
      <Stack spacing={5}>
        {snippet.comments.map((comment, index) => {
          isLastComment = (index === numberOfComments - 1) ? true : false
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

import Stack from '@mui/material/Stack'
import type { CellFailureProps } from '@redwoodjs/web'
import { useMemo } from 'react'
import { _SnippetWithComments } from 'src/gql_objects/gqlObjects'
import { arrayToTree } from '../Comment/CommentTree'
import Meta from '../Meta/Meta'
import RecursiveComments from '../RecursiveComments/RecursiveComments'

export const QUERY = gql`
  query SnippetsCommentsQuery($snippetId: Int!) {
    snippet(id: $snippetId) {
      id
      comments(input: { orderBy: { createdAt: desc } }) {
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

export const Loading = () => <Meta loading={true} />

export const Empty = () => (
  <Meta empty={true} message={'No comments, such empty!'} />
)

export const Failure = ({ error }: CellFailureProps) => (
  <Meta error={true} message={error.message} />
)

export const Success = ({
  snippet,
  snippetId,
}: {
  snippet: _SnippetWithComments
  snippetId: number
}) => {
  const numberOfComments = snippet.comments.length
  let isLastComment: boolean = false
  let renderDivider: boolean = false
  const noComments: boolean = numberOfComments === 0
  const yesComments: boolean = !noComments
  const { comments } = snippet

  const commentsTree = useMemo(() => arrayToTree(comments), [comments])

  return (
    <>
      <Stack spacing={2}>
        {commentsTree.map((comment, index) => {
          isLastComment = index === numberOfComments - 1 ? true : false
          renderDivider = !isLastComment
          return (
            <>
              <RecursiveComments
                snippetId={snippetId}
                key={comment.id}
                comment={comment}
              ></RecursiveComments>
              {/* <Comment
                snippetId={snippetId}
                key={comment.id}
                comment={comment}
              /> */}
              {/* {renderDivider && <Divider />} */}
            </>
          )
        })}
      </Stack>
    </>
  )
}

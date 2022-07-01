import { BoxProps } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Comment from 'src/components/Comment'
import { Comment as GQL_Comment } from 'types/graphql'

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  color: theme.palette.containerPrimary.contrastText,
  display: `inline-block`,
  margin: `8px 10px 0px 30px`,
  width: `2px`,
  background: `#bdbdbd`,
}))

type AuthorUsername = { author: Pick<GQL_Comment['author'], 'username'> }

type CommentData = Pick<
  GQL_Comment,
  'parentCommentId' | 'body' | 'id' | 'createdAt' | 'activity' | 'score'
> &
  AuthorUsername

type CommentNode = CommentData & { children?: Array<CommentNode> }

interface Props {
  comment: CommentNode
  snippetId: number
}

export const RecursiveComments = ({ comment, snippetId }: Props) => {
  const nestedComments = comment.children?.map((childComment: CommentNode) => {
    return (
      <RecursiveComments
        snippetId={snippetId}
        key={comment.id}
        comment={childComment}
      />
    )
  })

  const hasChildComments = nestedComments.length > 0

  return (
    <Comment snippetId={snippetId} comment={comment}>
      {hasChildComments && (
        <Stack direction={'row'}>
          <StyledBox />
          {nestedComments}
        </Stack>
      )}
    </Comment>
  )
}

export default RecursiveComments

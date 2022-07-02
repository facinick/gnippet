import { BoxProps } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Comment from 'src/components/Comment'
import { Comment as GQL_Comment } from 'types/graphql'

const StyledBox = styled(Box)<BoxProps>(({ theme }) => {
  const matchesVerySmall = useMediaQuery(theme.breakpoints.up('xs'))
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'))
  const matchesMedium = useMediaQuery(theme.breakpoints.up('md'))

  let marginXLeft = '30px'
  let marginXRight = '10px'
  let width = '2px'

  if (matchesVerySmall) {
    marginXLeft = '2px'
    marginXRight = '2px'
    width = '0.5px'
  }

  if (matchesSmall) {
    marginXLeft = '15px'
    marginXRight = '5px'
     width = '1px'
  }

  if (matchesMedium) {
    marginXLeft = '15px'
    marginXRight = '8px'
    width = '1px'
  }

  return {
    color: theme.palette.containerPrimary.contrastText,
    display: `inline-block`,
    margin: `8px ${marginXRight} 0px ${marginXLeft}`,
    width: `${width}`,
    background: `#bdbdbd`,
  }
})

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
          <>{nestedComments}</>
        </Stack>
      )}
    </Comment>
  )
}

export default RecursiveComments

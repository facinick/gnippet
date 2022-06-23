import { Stack, Divider, Typography, Box, Card } from '@mui/material'
import { Comment as TComment } from 'types/graphql'
import Comment from 'src/components/Comment'

interface Props {
  comments: Array<TComment>
}

const Comments = ({ comments }: Props) => {
  const numberOfComments = comments.length
  let isLastComment: boolean = false
  let renderDivider: boolean = false

  return (
    <>
      <Stack spacing={3}>
        {comments.map((comment, index) => {
          isLastComment = index === numberOfComments - 1 ? true : false
          renderDivider = !isLastComment
          return (
            <React.Fragment key={comment.id}>
                <Comment key={comment.id} comment={comment} />
                {renderDivider && <Divider />}
            </ React.Fragment>
          )
        })}
      </Stack>
    </>
  )
}

export default Comments

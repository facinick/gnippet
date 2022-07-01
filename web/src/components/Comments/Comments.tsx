import { useReactiveVar } from '@apollo/client'
import { Stack } from '@mui/material'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'
import { closeReplyForm, replyToCommentIdVar } from 'src/localStore/commentReplyForm'
import { Comment as GQL_Comment } from 'types/graphql'
import { arrayToTree } from '../Comment/CommentTree'
import RecursiveComments from '../RecursiveComments/RecursiveComments'
interface Props {
  comments: Array<Pick<GQL_Comment, 'body' | 'id' | 'parentCommentId'>>
  snippetId: number
}

const Comments = ({ comments, snippetId }: Props) => {
  const replyToCommentId = useReactiveVar(replyToCommentIdVar)
  const { currentUser, isAuthenticated } = useAuth()
  useEffect(() => {
    closeReplyForm()
  }, [])

  return (

      <Stack spacing={3}>
        {arrayToTree(comments).map((comment) => {
          return (
            <React.Fragment key={comment.id}>
              <RecursiveComments
                snippetId={snippetId}
                key={comment.id}
                comment={comment}
              />
            </React.Fragment>
          )
        })}
      </Stack>

  )
}

export default Comments

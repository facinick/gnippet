import { useReactiveVar } from '@apollo/client'
import { Divider, Stack } from '@mui/material'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'
import Comment from 'src/components/Comment'
import { closeReplyForm, replyToCommentIdVar } from 'src/localStore/commentReplyForm'
import { Comment as GQL_Comment } from 'types/graphql'
import CommentReplyForm from '../CommentReplyForm/CommentReplyForm'
interface Props {
  comments: Array<Pick<GQL_Comment, 'body' | 'id'>>
  snippetId: number
}

const Comments = ({ comments, snippetId }: Props) => {
  const replyToCommentId = useReactiveVar(replyToCommentIdVar)

  const { currentUser, isAuthenticated } = useAuth()
  const showReplyToCommentForm = currentUser?.id && isAuthenticated

  const numberOfComments = comments.length
  let isLastComment: boolean = false
  let renderDivider: boolean = false

  useEffect(() => {
    closeReplyForm()
  }, [])

  return (
    <>
      <Stack spacing={3}>
        {comments.map((comment, index) => {
          isLastComment = index === numberOfComments - 1 ? true : false
          renderDivider = !isLastComment
          const _showReplyToCommentForm =
            replyToCommentId === comment.id && showReplyToCommentForm

          return (
            <React.Fragment key={comment.id}>
              <Comment
                snippetId={snippetId}
                key={comment.id}
                comment={comment}
              />
              {_showReplyToCommentForm && (
                <CommentReplyForm
                  authorId={currentUser.id}
                  authorUsername={currentUser.username}
                  snippetId={snippetId}
                  parentCommentId={comment.id}
                />
              )}
              {renderDivider && <Divider />}
            </React.Fragment>
          )
        })}
      </Stack>
    </>
  )
}

export default Comments

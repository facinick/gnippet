import { Stack, Divider, Typography, Box, Card, ClickAwayListener } from '@mui/material'
import { Comment as TComment } from 'types/graphql'
import Comment from 'src/components/Comment'
import { useReactiveVar } from '@apollo/client'
import { replyToCommentIdVar, closeReplyForm } from 'src/localStore/commentReplyForm'
import CommentReplyForm from '../CommentReplyForm/CommentReplyForm'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'
interface Props {
  comments: Array<TComment>
  snippetId: number
}

const Comments = ({ comments, snippetId }: Props) => {
  const replyToCommentId = useReactiveVar(replyToCommentIdVar)

  const { currentUser, isAuthenticated } = useAuth()
  const showReplyToCommentForm = currentUser?.id && isAuthenticated

  const numberOfComments = comments.length
  let isLastComment: boolean = false
  let renderDivider: boolean = false

  // const handleClickAway = () => {
  //   console.log(`closing`)
  //   setReplyToParentCommentId({ field: -1 })
  // }

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
              {/* <ClickAwayListener onClickAway={handleClickAway}>
                <> */}
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
              {/* </>
              </ClickAwayListener> */}
            </React.Fragment>
          )
        })}
      </Stack>
    </>
  )
}

export default Comments

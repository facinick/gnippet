import { useReactiveVar } from '@apollo/client'
import ReplyIcon from '@mui/icons-material/Reply'
import { Button, Stack, Typography } from '@mui/material'
import { useAuth } from '@redwoodjs/auth'
import CommentReplyForm from 'src/components/CommentReplyForm'
import {
  closeReplyForm,
  replyToCommentIdVar,
  setReplyToParentCommentId
} from 'src/localStore/commentReplyForm'
import { Children } from 'src/types/children'
import { capitalizeFirstLetter } from 'src/utils/stringUtils'
import { Comment as GQL_Comment, Snippet } from 'types/graphql'
import Bookmark from '../Bookmark/Bookmark'
import CreatedAt from '../CreatedAt/CreatedAt'
import Space from '../Space/Space'
import Username from '../Username/Username'
import Voting from '../Voting/Voting'

type AuthorUsername = { author: Pick<GQL_Comment['author'], 'username'> }

type Props = {
  comment: Pick<
    GQL_Comment,
    'id' | 'score' | 'activity' | 'body' | 'createdAt' | 'parentCommentId'
  > &
    AuthorUsername
  snippetId: Snippet[keyof Pick<Snippet, 'id'>]
} & Children

const Comment = ({ comment, snippetId, children }: Props) => {
  const { id, score, activity, author, body, createdAt, parentCommentId } =
    comment
  const { isAuthenticated, currentUser } = useAuth()

  const replyToCommentId = useReactiveVar(replyToCommentIdVar)
  const showReplyToCommentForm =
    currentUser?.id && isAuthenticated && replyToCommentId === comment.id

  const replyFormIsOpen = replyToCommentId === id

  const toggleReplyToCommentForm = () => {
    if (replyFormIsOpen) {
      closeReplyForm()
    } else {
      setReplyToParentCommentId({ field: id })
    }
  }

  return (
    <article key={id}>
      <Stack spacing={2}>
        <Typography
          variant="body2"
          component="p"
          style={{ whiteSpace: 'pre-line' }}
        >
          {body}
          <Space />
          {'-'}
          <Space />
          <Typography variant="body2" component="i">
            <CreatedAt createdAt={createdAt} />
            <Space />
            {'by'}
            <Space />
            <Username username={author.username} />
          </Typography>
          <Space />
        </Typography>

        <Stack direction={'row'}>
          <Voting
            size={'small'}
            commentId={id}
            entity={'COMMENT'}
            snippetId={snippetId}
            score={score}
          />
          {isAuthenticated && (
            <Bookmark
              size={'small'}
              snippetId={snippetId}
              entity={'COMMENT'}
              commentId={id}
            />
          )}
          {isAuthenticated && (
            <Button
              color={replyFormIsOpen ? 'error' : 'secondary'}
              size={'small'}
              title={`Reply ${capitalizeFirstLetter(author.username)}`}
              onClick={toggleReplyToCommentForm}
            >
              <ReplyIcon />
            </Button>
          )}
        </Stack>
        {showReplyToCommentForm && (
          <CommentReplyForm
            authorId={currentUser?.id}
            authorUsername={currentUser?.username}
            snippetId={snippetId}
            parentCommentId={comment.id}
          />
        )}
        {children}
      </Stack>
    </article>
  )
}

export default Comment

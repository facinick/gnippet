import { useReactiveVar } from '@apollo/client'
import ReplyIcon from '@mui/icons-material/Reply'
import { Button, Stack, Typography } from '@mui/material'
import { useAuth } from '@redwoodjs/auth'
import { closeReplyForm, replyToCommentIdVar, setReplyToParentCommentId } from 'src/localStore/commentReplyForm'
import { DeepPartial } from 'src/theme'
import { Comment as TComment, Snippet } from 'types/graphql'
import Bookmark from '../Bookmark/Bookmark'
import CreatedAt from '../CreatedAt/CreatedAt'
import Space from '../Space/Space'
import Username from '../Username/Username'
import Voting from '../Voting/Voting'
type Props = {
  comment: DeepPartial<
    Pick<
      TComment,
      | 'id'
      | 'score'
      | 'activity'
      | 'author'
      | 'body'
      | 'createdAt'
      | 'parentCommentId'
    >
  >
  snippetId: Snippet[keyof Pick<Snippet, 'id'>]
}

const Comment = ({ comment, snippetId }: Props) => {
  const { id, score, activity, author, body, createdAt, parentCommentId } =
    comment
  const { isAuthenticated } = useAuth()

  const replyToCommentId = useReactiveVar(replyToCommentIdVar)

  const replyFormIsOpen = replyToCommentId === id

  const replyButtonText = replyFormIsOpen ? 'Cancel Reply' : 'Reply'

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
            {<CreatedAt createdAt={createdAt} />}
            <Space />
            {'by'}
            <Space />
            {<Username username={author.username} />}
          </Typography>
          <Space />
        </Typography>

        <Stack direction={'row'}>
          <Voting
            commentId={id}
            entity={'COMMENT'}
            snippetId={snippetId}
            score={score}
          />
          {isAuthenticated && (
            <Bookmark snippetId={snippetId} entity={'COMMENT'} commentId={id} />
          )}
          <Button onClick={toggleReplyToCommentForm}>
            <ReplyIcon />
            {replyButtonText}
          </Button>
        </Stack>
      </Stack>
    </article>
  )
}

export default Comment

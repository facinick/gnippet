import { useAuth } from '@redwoodjs/auth'
import CreatedAt from '../CreatedAt/CreatedAt'
import Username from '../Username/Username'
import Voting from '../Voting/Voting'
import { Comment as TComment, Snippet } from 'types/graphql'
import { Stack, Typography } from '@mui/material'
import Bookmark from '../Bookmark/Bookmark'
import { DeepPartial } from 'src/theme'
import Space from '../Space/Space'

type Props = {
  comment: DeepPartial<
    Pick<
      TComment,
      'id' | 'score' | 'activity' | 'author' | 'body' | 'createdAt'
    >
  >
  snippetId: Snippet[keyof Pick<Snippet, 'id'>]
}

const Comment = ({ comment, snippetId }: Props) => {
  const { id, score, activity, author, body, createdAt } = comment
  const { isAuthenticated } = useAuth()

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
        </Stack>
      </Stack>
    </article>
  )
}

export default Comment

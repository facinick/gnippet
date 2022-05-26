import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Downvote from '../Downvote/Downvote'
import Upvote from '../Upvote/Upvote'

interface Props {
  score: number
  currentVoteValue: 1 | -1 | 0
  snippetId: number
  commentId?: number
  userId: number
  entity: 'COMMENT' | 'SNIPPET'
  currentVoteId: number
}

const Voting = ({
  snippetId,
  commentId,
  currentVoteValue,
  score,
  entity,
  userId,
  currentVoteId
}: Props) => {
  return (
    <>
      <Stack alignItems={'center'} direction="row" spacing={1}>
        <Upvote
          currentVoteValue={currentVoteValue}
          userId={userId}
          commentId={commentId}
          score={score}
          entity={entity}
          snippetId={snippetId}
          currentVoteId={currentVoteId}
        />

        <Typography>{score}</Typography>

        <Downvote
          currentVoteValue={currentVoteValue}
          userId={userId}
          commentId={commentId}
          score={score}
          entity={entity}
          snippetId={snippetId}
          currentVoteId={currentVoteId}
        />
      </Stack>
    </>
  )
}

export default Voting

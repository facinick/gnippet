import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Downvote from '../Downvote/Downvote';
import Upvote from '../Upvote/Upvote';

interface Props {
  votes: number;
  vote: 1 | -1 | 0
  snippetId: number
  commentId?: number
  entity: 'COMMENT' | 'SNIPPET'
}

  const Voting = ({ snippetId, commentId, vote, votes, entity }: Props) => {
  return (
    <>
    <Stack alignItems={'center'} direction="row" spacing={1}>
      <Upvote commentId={commentId} entity={entity} vote={vote} snippetId={snippetId}/>

      <Typography>
        { votes }
      </Typography>

      <Downvote commentId={commentId} entity={entity} vote={vote} snippetId={snippetId}/>
    </Stack>
    </>
  )
}

export default Voting

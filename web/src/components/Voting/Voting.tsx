import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Downvote from '../Downvote/Downvote';
import Upvote from '../Upvote/Upvote';

interface Props {
  votes: number;
  vote: 1 | -1 | 0
  snippetId: number
}

  const Voting = ({ snippetId, vote, votes, disabled }: Props) => {
  return (
    <>
    <Stack alignItems={'center'} direction="row" spacing={1}>
      <Upvote vote={vote} snippetId={snippetId}/>

      <Typography>
        { votes }
      </Typography>

      <Downvote vote={vote} snippetId={snippetId}/>
    </Stack>
    </>
  )
}

export default Voting

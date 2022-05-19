import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Typography from '@mui/material/Typography';

interface Props {
  votes: number;
  onUpvote: () => void
  onDownvote: () => void
  vote: 1 | -1 | 0
  loading: boolean
}

const Voting = ({ vote, votes, onUpvote, onDownvote, loading }: Props) => {
  return (
    <>
    <Stack alignItems={'center'} direction="row" spacing={1}>
      <IconButton disabled={loading} onClick={onUpvote} aria-label="upvote">
        <ArrowUpwardIcon color={vote === 1 ? 'success' : 'inherit'} />
      </IconButton>

      <Typography>
        { votes }
      </Typography>

      <IconButton disabled={loading} onClick={onDownvote} aria-label="downvote">
        <ArrowDownwardIcon color={vote === -1 ? 'error' : 'inherit'} />
      </IconButton>
    </Stack>
    </>
  )
}

export default Voting

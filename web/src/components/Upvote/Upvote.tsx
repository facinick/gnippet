import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { UserDataQuery } from 'src/pages/HomePage/HomePage';
import { useAuth } from '@redwoodjs/auth';

const UPVOTE = gql`
  mutation upvoteSnippetMutation($input: Int!) {
    upvoteSnippet(id: $input) {
      id,
      body,
      createdAt,
      score,
      author {
        username
      }
      votes {
        userId
        snippetId
        type
        commentId
      }
    }
  }
`

interface Props {
  snippetId: number
  vote: -1 | 1 | 0
}

const Upvote = ({ snippetId, vote}: Props) => {

  const { currentUser } = useAuth()

  const [upvote, { loading }] = useMutation(UPVOTE, {
    onCompleted: (data) => {
      toast.success(':)')
    },
    refetchQueries: [
      {
        query: UserDataQuery,
        variables: {
          id: currentUser.id
        }
      }
    ]
  })

  const onClick = () => {
    upvote({ variables: { input: snippetId }})
  }

  return (
    <IconButton disabled={loading} onClick={onClick} aria-label="upvote">
      <ArrowUpwardIcon color={vote === 1 ? 'success' : 'inherit'} />
    </IconButton>
  )
}

export default Upvote
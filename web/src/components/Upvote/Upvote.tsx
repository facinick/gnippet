import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth';
import { USER_DATA_QUERY } from 'src/pages/Queries/queries';
import { QUERY as SNIPPET_QUERY } from 'src/components/SnippetCell'
const UPVOTE = gql`
  mutation upvoteSnippetMutation($input: Int!) {
    upvoteSnippet(id: $input) {
      id
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
        query: USER_DATA_QUERY,
        variables: {
          id: currentUser.id,
          votes: true,
          snippets: false
        }
      },
      {
        query: SNIPPET_QUERY,
        variables: {
          id: snippetId,
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
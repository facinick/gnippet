import IconButton from '@mui/material/IconButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth';
import { USER_DATA_QUERY } from 'src/pages/Queries/queries';
import { QUERY as SNIPPET_QUERY } from 'src/components/SnippetCell'

const DOWNVOTE = gql`
  mutation downvoteSnippetMutation($input: Int!) {
    downvoteSnippet(id: $input) {
      id,
    }
  }
`

interface Props {
  snippetId: number
  vote: -1 | 1 | 0
}

const Downvote = ({ snippetId, vote}: Props) => {

  const { currentUser } = useAuth()


  const [downvote, { loading, error, data }] = useMutation(DOWNVOTE, {
    onCompleted: () => {
      toast.success(':/')
    },
    refetchQueries: [
      {
        query: USER_DATA_QUERY,
        variables: {
          id: currentUser?.id,
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
    downvote({ variables: { input: snippetId }})
  }

  return (
    <IconButton disabled={loading} onClick={onClick} aria-label="downvote">
      <ArrowDownwardIcon color={vote === -1 ? 'error' : 'inherit'} />
    </IconButton>
  )
}

export default Downvote
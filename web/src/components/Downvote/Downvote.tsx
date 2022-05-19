import IconButton from '@mui/material/IconButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY as SnippetQuery } from 'src/components/SnippetCell'
import { useAuth } from '@redwoodjs/auth';
import { UserDataQuery } from 'src/pages/HomePage/HomePage';

const DOWNVOTE = gql`
  mutation downvoteSnippetMutation($input: Int!) {
    downvoteSnippet(id: $input) {
      id,
      body,
      createdAt,
      score,
      author {
        username
      }
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
        query: UserDataQuery,
        variables: {
          id: currentUser.id
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
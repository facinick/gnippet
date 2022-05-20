import IconButton from '@mui/material/IconButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth';
import { USER_DATA_QUERY } from 'src/pages/Queries/queries';
import { QUERY as SNIPPET_QUERY } from 'src/components/SnippetCell'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'

const DOWNVOTE = gql`
  mutation downvoteMutation($id: Int!, $input: VotingInput) {
    downvote(id: $id, input: $input) {
      id
    }
  }
`

interface Props {
  snippetId: number
  vote: -1 | 1 | 0
  entity: 'COMMENT' | 'SNIPPET'
  commentId?: number
}

const Downvote = ({ snippetId, vote, entity, commentId}: Props) => {

  const { currentUser } = useAuth()

  const [downvote, { loading }] = useMutation(DOWNVOTE, {
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
        query: entity === 'COMMENT' ? COMMENTS_QUERY : SNIPPET_QUERY,
        variables: {
          id: entity === 'COMMENT' ? commentId : snippetId,
          snippetId: snippetId,
        }
      }
    ]
  })

  const onClick = () => {
    downvote({
      variables: {
        id: entity === 'COMMENT' ? commentId : snippetId,
        input: {
          entityType: entity.toUpperCase(),
          snippetId: snippetId,
        }
      }
    })
  }

  return (
    <IconButton disabled={loading} onClick={onClick} aria-label="downvote">
      <ArrowDownwardIcon color={vote === -1 ? 'error' : 'inherit'} />
    </IconButton>
  )
}

export default Downvote
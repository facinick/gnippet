import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth';
import { USER_DATA_QUERY } from 'src/pages/Queries/queries';
import { QUERY as SNIPPET_QUERY } from 'src/components/SnippetCell'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'

const UPVOTE = gql`
  mutation upvoteMutation($id: Int!, $input: VotingInput) {
    upvote(id: $id, input: $input) {
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

const Upvote = ({ snippetId, vote, entity, commentId}: Props) => {

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
        query: entity === 'COMMENT' ? COMMENTS_QUERY : SNIPPET_QUERY,
        variables: {
          id: entity === 'COMMENT' ? commentId : snippetId,
          snippetId: snippetId,
        }
      }
    ]
  })

  const onClick = () => {
    upvote({
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
    <IconButton disabled={loading} onClick={onClick} aria-label="upvote">
      <ArrowUpwardIcon color={vote === 1 ? 'success' : 'inherit'} />
    </IconButton>
  )
}

export default Upvote
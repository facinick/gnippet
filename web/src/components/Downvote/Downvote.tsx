import IconButton from '@mui/material/IconButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth';
import { USER_DATA_QUERY } from 'src/pages/Queries/queries';
import { QUERY as SNIPPET_QUERY } from 'src/components/SnippetCell'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'
import { EntityType } from 'types/graphql';

const DOWNVOTE = gql`
  mutation downvoteMutation($input: VotingInput) {
    downvote(input: $input) {
      vote {
        id
        value
        entityType
        userId
        commentId
        snippetId
      }
      cudAction
      score
    }
  }
`

interface Props {
  snippetId: number
  vote: -1 | 1 | 0
  entity: EntityType
  commentId?: number
}

const Downvote = ({ snippetId, vote, entity, commentId}: Props) => {

  const [downvote, { loading }] = useMutation(DOWNVOTE, {

    update(cache, { data: { downvote } }) {

      const { score, cudAction, vote } = downvote

      const { userId, snippetId } = vote

      const { user } = cache.readQuery({
        query: USER_DATA_QUERY,
        variables: {
          id: userId,
          votes: true,
          snippets: false,
      }})

      let votes = user.votes

      //modify snippet score
      if(vote.entityType === 'SNIPPET') {

        // const { snippet } = cache.readQuery({
        //   query: SNIPPET_QUERY,
        //   variables: {
        //     id: snippetId,
        // }})

        // const newSnippet = { ...snippet, score}

        // cache.writeQuery({
        //   query: SNIPPET_QUERY,
        //   data: {
        //     snippet: newSnippet
        //   }
        // });
      }
      // modify comment score
      else {
        console.log(`modify comments cache baby`)
      }

      switch(cudAction) {
        case 'CREATED':
        // new vote was created... add this to my votes
        votes = [...votes, vote]
        break;

        case 'DELETED':
        // remove this vote, find by id
        votes = votes.filter((_vote) => _vote.id != vote.id );
        break;

        case 'UPDATED':
        // modify this vote's value, newValue = vote.value
        votes = votes.map((_vote) => _vote.id === vote.id ? {..._vote, value: vote.value} : _vote );
        break;

        default:
          throw new Error(`Unexpected value for cudAction: ${cudAction}`)
      }

      const newUserData = {...user, votes}
      console.log(votes)

      cache.writeQuery({
        query: USER_DATA_QUERY,
        data: {
          user: newUserData
        },
        variables: {
          votes: true,
          snippets: false
        }
      });
    },

    onCompleted: (data) => {
      toast.success('downvoted')
    },
  })

  const onClick = () => {
    downvote({
      variables: {
        input: {
          entityType: entity,
          snippetId: snippetId,
          commentId: commentId,
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
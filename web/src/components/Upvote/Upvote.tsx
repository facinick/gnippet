import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { USER_DATA_QUERY } from 'src/pages/Queries/queries';
import { QUERY as SNIPPET_QUERY } from 'src/components/SnippetCell'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'
import { EntityType } from 'types/graphql';

const UPVOTE = gql`
  mutation upvoteMutation($input: VotingInput) {
    upvote(input: $input) {
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

const Upvote = ({ snippetId, vote, entity, commentId}: Props) => {

  const [upvote, { loading }] = useMutation(UPVOTE, {
    update(cache, { data: { upvote } }) {

      const { score, cudAction, vote } = upvote

      const { userId, snippetId, commentId } = vote

      const { user } = cache.readQuery({
        query: USER_DATA_QUERY,
        variables: {
          id: userId,
          votes: true,
          snippets: false,
          comments: false,
      }})

      let votes = user.votes

      //modify snippet score
      if(vote.entityType === 'SNIPPET') {
        const snippetToModify = cache.writeFragment({
          id: `Snippet:${snippetId}`, // The value of the to-do item's cache ID
          fragment: gql`
            fragment SnippetToUpdate on Snippet {
              score
            },
          `,
          data: {
            score
          }
        })
      }
      // modify comment score
      else {
        const { snippet } = cache.readQuery({
          query: COMMENTS_QUERY,
          variables: {
            id: snippetId,
            snippetId,
          }
        })

        const newComments = snippet.comments.map(comment => comment.id === commentId ? {...comment, score } : comment)
        const newSnippet = {...snippet, comments: newComments}
        cache.writeQuery({
          query: COMMENTS_QUERY,
          data: {
            snippet: newSnippet,
            variables: {
              id: snippetId,
              snippetId,
            }
          },
        });
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

      cache.writeQuery({
        query: USER_DATA_QUERY,
        data: {
          user: newUserData
        },
        variables: {
          votes: true,
          snippets: false,
          comments: false,
        }
      });
    },
    onCompleted: ({ upvote }) => {
      if(upvote.cudAction === 'CREATED' || upvote.cudAction === 'UPDATED') {
        toast.success('🙂')
      } else {
        toast.success('😠')
      }
    },
  })

  const onClick = () => {
    upvote({
      variables: {
        input: {
          entityType: entity,
          snippetId: snippetId,
          commentId: commentId,
        }
      },
    })
  }

  return (
    <IconButton disabled={loading} onClick={onClick} aria-label="upvote">
      <ArrowUpwardIcon color={vote === 1 ? 'success' : 'inherit'} />
    </IconButton>
  )
}

export default Upvote
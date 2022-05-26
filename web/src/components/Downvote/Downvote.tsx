import IconButton from '@mui/material/IconButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { USER_DATA_QUERY } from 'src/pages/Queries/queries'
import { QUERY as SNIPPET_QUERY } from 'src/components/SnippetCell'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'
import { EntityType } from 'types/graphql'

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
  currentVoteValue: -1 | 1 | 0
  entity: EntityType
  commentId?: number
  userId: number
  currentVoteId: number
  score: number
}

const Downvote = ({
  userId,
  snippetId,
  entity,
  commentId,
  currentVoteValue,
  currentVoteId,
  score
}: Props) => {
  const [downvote, { loading }] = useMutation(DOWNVOTE, {
    update(cache, { data: { downvote } }) {
      const { score, cudAction, vote } = downvote
      const { userId, snippetId, commentId, id, value } = vote

      const userDataQueryResult = cache.readQuery({
        query: USER_DATA_QUERY,
        variables: {
          id: userId,
          votes: true,
          snippets: false,
          comments: false,
        },
      })

      if(!userDataQueryResult) {
        return
      }

      const user = userDataQueryResult.user

      let cachedVotes = user.votes

      //modify snippet score
      if (vote.entityType === 'SNIPPET') {
        const snippetToModify = cache.writeFragment({
          id: `Snippet:${snippetId}`, // The value of the to-do item's cache ID
          fragment: gql`
            fragment SnippetToUpdate on Snippet {
              score
            }
          `,
          data: {
            score,
          },
        })
      }
      // modify comment score
      else {
        const { snippet } = cache.readQuery({
          query: COMMENTS_QUERY,
          variables: {
            id: snippetId,
            snippetId,
          },
        })

        const newComments = snippet.comments.map((comment) =>
          comment.id === commentId ? { ...comment, score } : comment
        )
        const newSnippet = { ...snippet, comments: newComments }
        cache.writeQuery({
          query: COMMENTS_QUERY,
          data: {
            snippet: newSnippet,
            variables: {
              id: snippetId,
              snippetId,
            },
          },
        })
      }

      switch (cudAction) {
        case 'CREATED':
          // new vote was created... add this to my votes
          cachedVotes = [...cachedVotes, vote]
          break

        case 'DELETED':
          // remove this vote, find by id
          cachedVotes = cachedVotes.filter((cachedVote) => cachedVote.id != id)
          break

        case 'UPDATED':
          // modify this vote's value, newValue = vote.value
          cachedVotes = cachedVotes.map((cachedVote) =>
            cachedVote.id === id ? { ...cachedVote, value } : cachedVote
          )
          break

        default:
          throw new Error(`Unexpected value for cudAction: ${cudAction}`)
      }

      const newUserData = { ...user, votes: cachedVotes }

      if(cudAction === 'DELETED') {
        cache.evict({ id: `Vote:${id}` })
      }

      cache.writeQuery({
        query: USER_DATA_QUERY,
        data: {
          user: newUserData,
        },
        variables: {
          votes: true,
          snippets: false,
          comments: false,
        },
      })
    },
    onCompleted: ({ downvote }) => {
      if (
        downvote.cudAction === 'CREATED' ||
        downvote.cudAction === 'UPDATED'
      ) {
        toast.success('😠')
      } else {
        toast.success('🙂')
      }
    },
    // optimisticResponse: {
    //   downvote: {
    //     __typename: "VoteResponse",
    //     vote: {
    //       id:
    //       currentVoteValue === -1
    //         ? currentVoteId
    //         : currentVoteValue === 1
    //         ? currentVoteId
    //         : `${Date.now()}`,
    //       __typename: 'Vote',
    //       value: -1,
    //       entityType: entity,
    //       userId: userId,
    //       commentId: commentId ? commentId : `${Date.now()}`,
    //       snippetId,
    //     },
    //     cudAction:
    //       currentVoteValue === -1
    //         ? 'DELETED'
    //         : currentVoteValue === 1
    //         ? 'UPDATED'
    //         : 'CREATED',
    //     score:
    //       currentVoteValue === -1
    //         ? score + 1
    //         : currentVoteValue === 1
    //         ? score - 2
    //         : score - 1,
    //   },
    // },
  })

  const onClick = () => {
    downvote({
      variables: {
        input: {
          entityType: entity,
          snippetId: snippetId,
          commentId: commentId,
        },
      },
    })
  }

  return (
    <IconButton disabled={loading} onClick={onClick} aria-label="downvote">
      <ArrowDownwardIcon
        color={currentVoteValue === -1 ? 'error' : 'inherit'}
      />
    </IconButton>
  )
}

export default Downvote

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Button } from '@mui/material'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { DOWNVOTE_MUTATION } from 'src/graphql/mutations'
import { USER_VOTES_QUERY } from 'src/graphql/queries'
import { EntityType } from 'types/graphql'

interface Props {
  snippetId: number
  currentVoteValue: -1 | 1 | 0
  entity: EntityType
  commentId?: number
  userId: number
  currentVoteId: number
  score: number
  disabled: boolean
  size: 'large' | 'small'
}

const Downvote = ({
  userId,
  snippetId,
  entity,
  commentId,
  disabled,
  currentVoteValue,
  currentVoteId,
  size,
  score,
}: Props) => {
  const [downvote, { loading }] = useMutation(DOWNVOTE_MUTATION, {
    update(cache, { data: { downvote } }) {
      const { score, cudAction, vote } = downvote
      const { userId, snippetId, commentId, id, value } = vote

      const userVotesQueryResults = cache.readQuery({
        query: USER_VOTES_QUERY,
        variables: {
          userId,
        },
      })

      if (!userVotesQueryResults) {
        return
      }

      //@ts-ignore
      let cachedVotes = userVotesQueryResults.votes

      //modify snippet score
      if (vote.entityType === 'SNIPPET') {
        cache.writeFragment({
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
        cache.writeFragment({
          id: `Comment:${commentId}`,
          fragment: gql`
            fragment CommentToUpdate on Comment {
              score
            }
          `,
          data: {
            score,
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

      if (cudAction === 'DELETED') {
        cache.evict({ id: `Vote:${id}` })
      }

      cache.writeQuery({
        query: USER_VOTES_QUERY,
        data: {
          votes: cachedVotes,
        },
        variables: {
          userId,
        },
      })
    },
    onCompleted: ({ downvote }) => {
      if (
        downvote.cudAction === 'CREATED' ||
        downvote.cudAction === 'UPDATED'
      ) {
        toast.success('Downvoted')
      } else {
        toast.success('Cancelled Downvote')
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
    <Button
      title={currentVoteValue === -1 ? 'Cancel Downvote' : 'Downvote'}
      color={currentVoteValue === -1 ? 'downvote' : 'inherit'}
      variant="text"
      size={size}
      disabled={loading || disabled}
      onClick={onClick}
      aria-label="downvote"
    >
      <ArrowDownwardIcon />
    </Button>
  )
}

export default Downvote

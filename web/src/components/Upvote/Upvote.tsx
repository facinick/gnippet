import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Button, useTheme } from '@mui/material'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { UPVOTE_MUTATION } from 'src/graphql/mutations'
import { USER_VOTES_QUERY } from 'src/graphql/queries'
import { EntityType } from 'types/graphql'

interface Props {
  snippetId: number
  currentVoteValue: -1 | 1 | 0
  entity: EntityType
  commentId?: number
  userId: number
  score: number
  currentVoteId: number
  disabled: boolean
  size: 'large' | 'small'
}

const Upvote = ({
  snippetId,
  currentVoteValue,
  currentVoteId,
  entity,
  commentId,
  userId,
  disabled,
  size,
  score,
}: Props) => {
  const [upvote, { loading }] = useMutation(UPVOTE_MUTATION, {
    update(cache, { data: { upvote } }) {
      const { score, cudAction, vote } = upvote
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
          id: `Snippet:${snippetId}`,
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
    onCompleted: ({ upvote }) => {
      if (upvote.cudAction === 'CREATED' || upvote.cudAction === 'UPDATED') {
        toast.success('Upvoted')
      } else {
        toast.success('Cancelled Upvote')
      }
    },
  })

  const onClick = (event) => {
    upvote({
      variables: {
        input: {
          entityType: entity,
          snippetId: snippetId,
          commentId: commentId,
        },
      },
    })
  }

  const theme = useTheme();

  return (
    <Button
      title={currentVoteValue === 1 ? 'Cancel Upvote' : 'Upvote'}
      color={currentVoteValue === 1 ? 'upvote' : 'inherit'}
      variant="text"
      size={size}
      type="button"
      disabled={loading || disabled}
      onClick={onClick}
      aria-label="upvote"
    >
      <ArrowUpwardIcon />
    </Button>
  )
}

export default Upvote

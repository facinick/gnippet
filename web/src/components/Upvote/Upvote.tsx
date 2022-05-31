import IconButton from '@mui/material/IconButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { USER_VOTES_QUERY } from 'src/pages/Queries/queries'
import { QUERY as SNIPPET_QUERY } from 'src/components/SnippetCell'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'
import { EntityType } from 'types/graphql'
import { Button, useTheme } from '@mui/material'

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
  currentVoteValue: -1 | 1 | 0
  entity: EntityType
  commentId?: number
  userId: number
  score: number
  currentVoteId: number
  disabled: boolean
}

const Upvote = ({
  snippetId,
  currentVoteValue,
  currentVoteId,
  entity,
  commentId,
  userId,
  disabled,
  score,
}: Props) => {
  const [upvote, { loading }] = useMutation(UPVOTE, {
    update(cache, { data: { upvote } }) {
      const { score, cudAction, vote } = upvote
      const { userId, snippetId, commentId, id, value } = vote

      const userVotesQueryResults = cache.readQuery({
        query: USER_VOTES_QUERY,
        variables: {
          userId,
        }
      })

      if(!userVotesQueryResults) {
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

      if(cudAction === 'DELETED') {
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
    // optimisticResponse: {
    //   upvote: {
    //     __typename: "VoteResponse",
    //     vote: {
    //       id:
    //         currentVoteValue === -1
    //           ? currentVoteId
    //           : currentVoteValue === 1
    //           ? currentVoteId
    //           : Date.now(),
    //       __typename: 'Vote',
    //       value: 1,
    //       entityType: entity,
    //       userId,
    //       commentId: commentId ? commentId : Date.now(),
    //       snippetId,
    //     },
    //     cudAction:
    //       currentVoteValue === -1
    //         ? 'UPDATED'
    //         : currentVoteValue === 1
    //         ? 'DELETED'
    //         : 'CREATED',
    //     score:
    //       currentVoteValue === -1
    //         ? score + 2
    //         : currentVoteValue === 1
    //         ? score - 1
    //         : score + 1,
    //   },
    // },
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
    <Button color={currentVoteValue === 1 ? 'upvote' : 'inherit'} variant='text' size={'large'} type="button" disabled={loading || disabled} onClick={onClick} aria-label="upvote">
      <ArrowUpwardIcon />
    </Button>
  )
}

export default Upvote

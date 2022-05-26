import IconButton from '@mui/material/IconButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { USER_DATA_QUERY } from 'src/pages/Queries/queries'
import { QUERY as SNIPPET_QUERY } from 'src/components/SnippetCell'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'
import { EntityType } from 'types/graphql'

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
}

const Upvote = ({
  snippetId,
  currentVoteValue,
  currentVoteId,
  entity,
  commentId,
  userId,
  score,
}: Props) => {
  const [upvote, { loading }] = useMutation(UPVOTE, {
    update(cache, { data: { upvote } }) {
      const { score, cudAction, vote } = upvote
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
          id: userId,
          votes: true,
          snippets: false,
          comments: false,
        },
      })

    },
    onCompleted: ({ upvote }) => {
      if (upvote.cudAction === 'CREATED' || upvote.cudAction === 'UPDATED') {
        toast.success('🙂')
      } else {
        toast.success('😠')
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
    console.log(event)
    event.preventDefault()
    event.stopPropagation()
    upvote({
      variables: {
        input: {
          entityType: entity,
          snippetId: snippetId,
          commentId: commentId,
        },
      },
    })
    return false
  }

  return (
    <IconButton type="button" disabled={loading} onClick={onClick} aria-label="upvote">
      <ArrowUpwardIcon color={currentVoteValue === 1 ? 'success' : 'inherit'} />
    </IconButton>
  )
}

export default Upvote

import { useApolloClient } from '@apollo/client'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import { USER_VOTES_QUERY } from 'src/graphql/queries'
import Downvote from '../Downvote/Downvote'
import Upvote from '../Upvote/Upvote'

import { TypographyProps } from '@mui/material'

const VotesCount = styled(Typography)<TypographyProps & { vote: 1 | -1 | 0 }>(
  ({ theme, vote }) => ({
    color:
      vote === 1
        ? theme.palette.upvote.contrastText
        : vote === -1
        ? theme.palette.downvote.contrastText
        : 'inherit',
    backgroundColor:
      vote === 1
        ? theme.palette.upvote.main
        : vote === -1
        ? theme.palette.downvote.main
        : 'inherit',
    padding: '0px 15px',
    textAlign: 'center',
    borderRadius: '50px',
  })
)

interface Props {
  score: number
  snippetId: number
  commentId?: number
  entity: 'COMMENT' | 'SNIPPET'
  size: 'large' | 'small'
}

const Voting = ({ snippetId, commentId, score, entity, size }: Props) => {
  const { isAuthenticated, currentUser } = useAuth()
  const [currentVoteValue, setCurrentVoteValue] = useState<0 | 1 | -1>(0)
  const [currentVoteId, setCurrentVoteId] = useState<number>(0)
  const client = useApolloClient()

  const userVotesQueryResults = client.readQuery({
    query: USER_VOTES_QUERY,
    variables: {
      userId: currentUser?.id,
    },
  })

  useEffect(() => {
    if (!userVotesQueryResults) {
      return
    }

    const vote = userVotesQueryResults.votes.find(
      (vote) =>
        (vote.snippetId === snippetId &&
          vote.entityType === entity &&
          vote.entityType === 'SNIPPET') ||
        (vote.commentId === commentId &&
          vote.entityType &&
          vote.entityType === entity &&
          vote.entityType === 'COMMENT')
    )

    setCurrentVoteValue(vote ? (vote.value as 1 | -1 | 0) : 0)
    setCurrentVoteId(vote ? vote.id : 0)
  }, [userVotesQueryResults])

  useEffect(() => {
    if (!isAuthenticated) {
      client.writeQuery({
        query: USER_VOTES_QUERY,
        variables: {
          userId: currentUser?.id,
        },
        data: {
          votes: [],
        },
      })
    }
  }, [isAuthenticated])

  return (
    <>
      <Stack alignItems={'center'} direction="row" spacing={1}>
        <Upvote
          currentVoteValue={currentVoteValue}
          userId={currentUser?.id}
          commentId={commentId}
          score={score}
          entity={entity}
          disabled={!isAuthenticated}
          snippetId={snippetId}
          currentVoteId={currentVoteId}
          size={size}
        />

        <VotesCount vote={currentVoteValue}>{score}</VotesCount>

        <Downvote
          currentVoteValue={currentVoteValue}
          userId={currentUser?.id}
          commentId={commentId}
          score={score}
          entity={entity}
          disabled={!isAuthenticated}
          snippetId={snippetId}
          currentVoteId={currentVoteId}
          size={size}
        />
      </Stack>
    </>
  )
}

export default Voting

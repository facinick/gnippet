import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { USER_DATA_QUERY, USER_VOTES_QUERY } from 'src/pages/Queries/queries'
import { truncate as returnTruncatedText } from 'src/utils/stringUtils'
import CreatedAt from '../CreatedAt/CreatedAt'
import Username from '../Username/Username'
import Voting from '../Voting/Voting'
import { useApolloClient } from '@apollo/client'
import { Comment as TComment } from 'types/graphql'
import { Stack, Typography } from '@mui/material'

type Props = {
  comment: TComment
}

const Comment = ({ comment }: Props) => {
  const { id, score, activity, author, body, createdAt, snippetId } = comment
  const { isAuthenticated } = useAuth()

  return (
    <article key={id}>
      <Stack spacing={2}>
      <Typography variant='body2' component='p' style={{ whiteSpace: 'pre-line' }}>
        {body} -{' '}
        <Typography  variant='body2' component='i'>
          {' '}
          {<CreatedAt createdAt={createdAt} />} by{' '}
          {<Username username={author.username} />}
        </Typography>{' '}
      </Typography>
      {isAuthenticated && (
        <Voting
          commentId={id}
          entity={'COMMENT'}
          snippetId={snippetId}
          score={score}
        />
      )}
      </Stack>
    </article>
  )
}

export default Comment

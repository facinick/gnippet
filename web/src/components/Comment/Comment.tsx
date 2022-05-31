import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { truncate as returnTruncatedText } from 'src/utils/stringUtils'
import CreatedAt from '../CreatedAt/CreatedAt'
import Username from '../Username/Username'
import Voting from '../Voting/Voting'
import { useApolloClient } from '@apollo/client'
import { Comment as TComment } from 'types/graphql'
import { Stack, Typography } from '@mui/material'
import Bookmark from '../Bookmark/Bookmark'

type Props = {
  comment: TComment
}

const Comment = ({ comment }: Props) => {
  const { id, score, activity, author, body, createdAt, snippetId } = comment
  const { isAuthenticated } = useAuth()

  return (
    <article key={id}>
      <Stack spacing={2}>
        <Typography
          variant="body2"
          component="p"
          style={{ whiteSpace: 'pre-line' }}
        >
          {body} -{' '}
          <Typography variant="body2" component="i">
            {' '}
            {<CreatedAt createdAt={createdAt} />} by{' '}
            {<Username username={author.username} />}
          </Typography>{' '}
        </Typography>

        <Stack direction={'row'}>
          <Voting
            commentId={id}
            entity={'COMMENT'}
            snippetId={snippetId}
            score={score}
          />
          {isAuthenticated && <Bookmark snippetId={snippetId} entity={'COMMENT'} commentId={id} />}
        </Stack>
      </Stack>
    </article>
  )
}

export default Comment

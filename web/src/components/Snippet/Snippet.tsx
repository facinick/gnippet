import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { _Snippet, _SnippetWithVotes, _Vote } from 'src/gql_objects/gqlObjects'
import { USER_VOTES_QUERY } from 'src/pages/Queries/queries'
import { truncate as returnTruncatedText } from 'src/utils/stringUtils'
import CreatedAt from '../CreatedAt/CreatedAt'
import Username from '../Username/Username'
import Voting from '../Voting/Voting'
import { useApolloClient } from '@apollo/client'
import BackButton from '../BackButton/BackButton'
import Stack from '@mui/material/Stack'
import SnippetTags from '../SnippetTags/SnippetTags'
import CommentForm from '../CommentForm/CommentForm'
import Comments from '../Comments/Comments'
import { Snippet } from 'types/graphql'
import Typography from '@mui/material/Typography'
import NumberOfComments from '../NumberOfComments/NumberOfComments'
import CommentsHeader from '../CommentsHeader/CommentsHeader'

type Props = {
  snippet: Snippet
  truncate: boolean
  showActivity: boolean
  showBackButton: boolean
  showComments: boolean
  showCommentsForm: boolean
  showCommentsHeader: boolean
}

const ControlledSnippet = ({
  showBackButton,
  showActivity,
  snippet,
  truncate,
  showComments,
  showCommentsForm,
  showCommentsHeader,
}: Props) => {
  const { id, title, score, author, body, createdAt, tags, comments } = snippet
  const { isAuthenticated, currentUser } = useAuth()

  const showNumberOfComments = comments.length > 0 && !showCommentsHeader
  const rendertags = tags.length > 0

  return (
    <article key={id}>
      <Stack spacing={2}>
        <header>
          <Stack alignItems={'center'} spacing={1} direction={'row'}>
            {showBackButton && <BackButton />}
            <Link to={routes.snippet({ id: id })}>
              <Typography variant='h6'>
                {title}
              </Typography>
            </Link>
          </Stack>
        </header>
        {truncate && (
          <Typography variant='body1' component="p" style={{ whiteSpace: 'pre-line' }}>
            {returnTruncatedText(body, 150)}
            {body.length > 150 && (
              <Link to={routes.snippet({ id: id })}>[read-more]</Link>
            )}{' '}
            -
            <Typography variant='body1' component="i">
              {' '}
              {<CreatedAt createdAt={createdAt} />} by <span> </span>
              {<Username username={author.username} />}
            </Typography>
          </Typography>
        )}
        {!truncate && (
          <Typography variant='body1' component="p"  style={{ whiteSpace: 'pre-line' }}>
            {body} -{' '}
            <Typography variant='body1' component="i">
              {' '}
              {<CreatedAt createdAt={createdAt} />} by{' '}
            </Typography>
            {<Username username={author.username} />}
          </Typography>
        )}
        <Voting entity={'SNIPPET'} snippetId={id} score={score} />
        {rendertags && <SnippetTags tags={tags} />}
        {isAuthenticated && showCommentsForm && (
          <CommentForm authorUsername={currentUser?.username} snippetId={id} authorId={currentUser.id} />
        )}
        {showNumberOfComments && <NumberOfComments value={comments.length} />}
        {showCommentsHeader && (
          <CommentsHeader numberOfComments={comments.length} />
        )}
        {showComments && <Comments comments={comments} />}
      </Stack>
    </article>
  )
}

export default ControlledSnippet

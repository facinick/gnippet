import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import {
  USER_DATA_QUERY
} from 'src/graphql/queries'
import { UserQuery, UserQueryVariables } from 'types/graphql'
import CommentsList from '../CommentsList/CommentsList'
import Meta from '../Meta/Meta'
import SnippetsList from '../SnippetsList/SnippetsList'

export const QUERY = USER_DATA_QUERY

export const Loading = () => <Meta loading={true} />

export const Empty = () => (
  <Meta empty={true} message={'Your creations shall appear here!'} />
)

export const Failure = ({ error }: CellFailureProps<UserQueryVariables>) => (
  <Meta error={true} message={error.message} />
)

export const Success = ({
  user,
}: CellSuccessProps<UserQuery, UserQueryVariables>) => {
  const votesSnippets = user.votes
    .map((vote) => vote.snippet)
    .filter((snippet) => snippet !== null)
  const votesComments = user.votes
    .map((vote) => vote.comment)
    .filter((comment) => comment !== null)


  const snippetsHeaderText =
    votesSnippets.length > 0 ? 'Snippets' : 'Vote snippets to view them here!'
  const commentsHeaderText =
    votesComments.length > 0 ? 'Comments' : 'Vote comments to view them here!'

  return (
    <div>
      <Stack spacing={2}>
        <Typography variant={'body1'}> {snippetsHeaderText}</Typography>
        <SnippetsList snippets={votesSnippets} />
        <Typography variant={'body1'}> {commentsHeaderText}</Typography>
        <CommentsList comments={votesComments} />
      </Stack>
    </div>
  )
}

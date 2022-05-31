import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { USER_DATA_QUERY, USER_DATA_QUERY_BY_USERNAME } from 'src/pages/Queries/queries'
import { UserQuery, UserQueryVariables } from 'types/graphql'
import CommentsList from '../CommentsList/CommentsList'
import SnippetsList from '../SnippetsList/SnippetsList'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Meta from '../Meta/Meta'
import { Stack } from '@mui/material'

export const QUERY = USER_DATA_QUERY_BY_USERNAME

export const Loading = () => <Meta loading={true}/>

export const Empty = ({username}) => <Meta empty={true} message={`${username}'s creations shall appear here!`}/>

export const Failure = ({ error }: UserQueryVariables) => <Meta error={true} message={error.message} />

export const Success = ({
  user,
}: CellSuccessProps<UserQuery, UserQueryVariables>) => {

  const userSnippets = user.snippets
  const userComments = user.comments

  return (
  <Stack spacing={2}>
    <Typography> Snippets</Typography>
    <SnippetsList snippets={userSnippets}/>
    <Typography> Comments</Typography>
    <CommentsList comments={userComments}/>
  </Stack>)
}

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { USER_DATA_QUERY, USER_DATA_QUERY_BY_USERNAME } from 'src/graphql/queries'
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

export const Empty = ({username}) => <Meta empty={true} message={`user ${username} not found`}/>

export const Failure = ({ error }: UserQueryVariables) => <Meta error={true} message={error.message} />

export const Success = ({
  user,
}: CellSuccessProps<UserQuery, UserQueryVariables>) => {

  const userSnippets = user.snippets
  const userComments = user.comments

  const snippetsHeaderText = userSnippets.length > 0 ? "Snippets" : "Create snippets to view them here!"
  const commentsHeaderText = userComments.length > 0 ? "Comments" : "Create comments to view them here!"

  return (
  <Stack spacing={2}>
    <Typography variant={'body1'}> {snippetsHeaderText}</Typography>
    <SnippetsList snippets={userSnippets}/>
    <Typography variant={'body1'}> {commentsHeaderText}</Typography>
    <CommentsList comments={userComments}/>
  </Stack>)
}

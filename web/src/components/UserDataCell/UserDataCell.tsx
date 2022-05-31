import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { USER_DATA_QUERY } from 'src/pages/Queries/queries'
import { UserQueryVariables, UserQuery } from 'types/graphql'
import CommentsList from '../CommentsList/CommentsList'
import SnippetsList from '../SnippetsList/SnippetsList'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Meta from 'src/components/Meta/Meta'

export const QUERY = USER_DATA_QUERY

export const Loading = () => <Meta loading={true}/>

export const Empty = () => <Meta empty={true} message={'Your bookmarks shall appear here!'}/>

export const Failure = ({ error }: UserQueryVariables) => <Meta error={true} message={error.message} />

export const Success = ({ user }: CellSuccessProps<UserQuery, UserQueryVariables>) => {

  const savedSnippetBookmarks = user?.bookmarks?.filter(
    (bookmark) => bookmark.entityType === 'SNIPPET'
  )

  const savedCOmmentBookmarks = user?.bookmarks?.filter(
    (bookmark) => bookmark.entityType === 'COMMENT'
  )
  const savedSnippets = savedSnippetBookmarks?.map((bookmark) => bookmark.snippet)
  const savedComments = savedCOmmentBookmarks?.map((bookmark) => bookmark.comment)

  return (
    <div>
      <SnippetsList snippets={savedSnippets}/>
      <CommentsList comments={savedComments}/>
    </div>
  )
}

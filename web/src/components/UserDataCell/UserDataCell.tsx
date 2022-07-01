import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import Meta from 'src/components/Meta/Meta'
import { USER_DATA_QUERY } from 'src/graphql/queries'
import { UserQuery, UserQueryVariables } from 'types/graphql'
import CommentsList from '../CommentsList/CommentsList'
import SnippetsList from '../SnippetsList/SnippetsList'

export const QUERY = USER_DATA_QUERY

export const Loading = () => <Meta loading={true}/>

export const Empty = () => <Meta empty={true} message={'Your bookmarks shall appear here!'}/>

export const Failure = ({ error }: CellFailureProps<UserQueryVariables>) => (
  <Meta error={true} message={error.message} />
)

export const Success = ({ user }: CellSuccessProps<UserQuery, UserQueryVariables>) => {

  const savedSnippetBookmarks = user?.bookmarks?.filter(
    (bookmark) => bookmark.entityType === 'SNIPPET'
  )

  const savedCOmmentBookmarks = user?.bookmarks?.filter(
    (bookmark) => bookmark.entityType === 'COMMENT'
  )
  const savedSnippets = savedSnippetBookmarks?.map((bookmark) => bookmark.snippet)
  const savedComments = savedCOmmentBookmarks?.map((bookmark) => bookmark.comment)

  const snippetsHeaderText = savedSnippets.length > 0 ? "Snippets" : "Save snippets to view them here!"
  const commentsHeaderText = savedComments.length > 0 ? "Comments" : "Save comments to view them here!"

  return (
    <Stack spacing={2}>
      <Typography variant={'body1'}> {snippetsHeaderText}</Typography>
      <SnippetsList snippets={savedSnippets} />
      <Typography variant={'body1'}> {commentsHeaderText}</Typography>
      <CommentsList comments={savedComments} />
    </Stack>
  )
}

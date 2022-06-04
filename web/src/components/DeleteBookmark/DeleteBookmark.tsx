import IconButton from '@mui/material/IconButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import {
  CREATE_BOOKMARK_MUTATION,
  DELETE_BOOKMARK_MUTATION,
  USER_BOOKMARKS_QUERY,
  USER_VOTES_QUERY,
} from 'src/pages/Queries/queries'
import { QUERY as SNIPPET_QUERY } from 'src/components/SnippetCell'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'
import { EntityType } from 'types/graphql'
import { Button, useTheme } from '@mui/material'

import BookmarkIcon from '@mui/icons-material/Bookmark'
interface Props {
  snippetId: number
  entity: EntityType
  commentId?: number
  userId: number
  disabled: boolean
  currentBookmarkId: number
}

const DeleteBookmark = ({
  snippetId,
  entity,
  commentId,
  userId,
  disabled,
  currentBookmarkId,
}: Props) => {
  const [deleteBookmark, { loading }] = useMutation(DELETE_BOOKMARK_MUTATION, {
    update(cache, { data: { bookmark } }) {
      const { id, userId } = bookmark

      const userBookmarksQueryResults = cache.readQuery({
        query: USER_BOOKMARKS_QUERY,
        variables: {
          userId,
        },
      })

      if (!userBookmarksQueryResults) {
        return
      }

      //@ts-ignore
      let cachedBookmarks = userBookmarksQueryResults.bookmarks

      cachedBookmarks = cachedBookmarks.filter(
        (cachedBookmark) => cachedBookmark.id != id
      )

      cache.writeQuery({
        query: USER_BOOKMARKS_QUERY,
        data: {
          bookmarks: cachedBookmarks,
        },
        variables: {
          userId,
        },
      })
    },
    onCompleted: ({ bookmark }) => {
      toast.success('Removed')
    },
  })

  const onClick = (event) => {
    deleteBookmark({
      variables: {
        id: currentBookmarkId,
      },
    })
  }

  const theme = useTheme()

  return (
    <Button
      color={'primary'}
      variant="text"
      size={'large'}
      type="button"
      disabled={loading || disabled}
      onClick={onClick}
      aria-label="remove bookmark"
    >
      <BookmarkIcon />
    </Button>
  )
}

export default DeleteBookmark

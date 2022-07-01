import { Button, useTheme } from '@mui/material'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import {
  DELETE_BOOKMARK_MUTATION,
  USER_BOOKMARKS_QUERY
} from 'src/graphql/queries'
import { EntityType } from 'types/graphql'

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
      title={'Remove Bookmark'}
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

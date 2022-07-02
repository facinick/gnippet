import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Button, useTheme } from '@mui/material'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { CREATE_BOOKMARK_MUTATION, USER_BOOKMARKS_QUERY } from 'src/graphql/queries'
import { EntityType } from 'types/graphql'
interface Props {
  snippetId: number
  entity: EntityType
  commentId?: number
  userId: number
  disabled: boolean
  size: 'large' | 'small'
}

const CreateBookmark = ({
  snippetId,
  entity,
  commentId,
  userId,
  size,
  disabled,
}: Props) => {
  const [createBookmark, { loading }] = useMutation(CREATE_BOOKMARK_MUTATION, {
    update(cache, { data: { bookmark } }) {
      const { userId } = bookmark

      const userBookmarksQueryResults = cache.readQuery({
        query: USER_BOOKMARKS_QUERY,
        variables: {
          userId,
        }
      })

      if(!userBookmarksQueryResults) {
        return
      }

      //@ts-ignore
      let cachedBookmarks = userBookmarksQueryResults.bookmarks

      cachedBookmarks = [...cachedBookmarks, bookmark]

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
      toast.success('Saved')
    }
  })

  const onClick = (event) => {
    createBookmark({
      variables: {
        input: {
          entityType: entity,
          snippetId: snippetId,
          commentId: commentId,
          userId: userId
        },
      },
    })
  }

  const theme = useTheme();

  return (
    <Button title={'Bookmark'} color={'secondary'} variant='text' size={size} type="button" disabled={loading || disabled} onClick={onClick} aria-label="bookmark">
      <BookmarkBorderIcon />
    </Button>
  )
}

export default CreateBookmark

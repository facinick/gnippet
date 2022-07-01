import { useApolloClient } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import { USER_BOOKMARKS_QUERY } from 'src/graphql/queries'
import CreateBookmark from '../CreateBookmark/CreateBookmark'
import DeleteBookmark from '../DeleteBookmark/DeleteBookmark'

interface Props {
  snippetId: number
  commentId?: number
  entity: 'COMMENT' | 'SNIPPET'
}

const Bookmark = ({ snippetId, commentId, entity }: Props) => {
  const { isAuthenticated, currentUser } = useAuth()
  const [currentVoteState, setCurrentBookmarkState] = useState<boolean>(false)
  const [currentBookmarkId, setCurrentBookmarkId] = useState<number>(0)
  const client = useApolloClient()

  const userBookmarksQueryResults = client.readQuery({
    query: USER_BOOKMARKS_QUERY,
    variables: {
      userId: currentUser?.id,
    },
  })

  useEffect(() => {
    if (!userBookmarksQueryResults) {
      return
    }

    const bookmark = userBookmarksQueryResults.bookmarks.find(
      (bookmark) =>
        (bookmark.snippetId === snippetId &&
          bookmark.entityType === entity &&
          bookmark.entityType === 'SNIPPET') ||
        (bookmark.commentId === commentId &&
          bookmark.entityType &&
          bookmark.entityType === entity &&
          bookmark.entityType === 'COMMENT')
    )

    setCurrentBookmarkState(bookmark ? true : false)
    setCurrentBookmarkId(bookmark ? bookmark.id : 0)
  }, [userBookmarksQueryResults])

  useEffect(() => {
    if (!isAuthenticated) {
      client.writeQuery({
        query: USER_BOOKMARKS_QUERY,
        variables: {
          input: {
            userId: currentUser?.id,
          },
        },
        data: {
          bookmarks: []
        }
      })
    }
  }, [isAuthenticated])

  return (
    <>
      {!currentVoteState && (
        <CreateBookmark

          userId={currentUser?.id}
          disabled={false}
          entity={entity}
          commentId={commentId}
          snippetId={snippetId}
        />
      )}
      {currentVoteState && (
        <DeleteBookmark

          currentBookmarkId={currentBookmarkId}
          userId={currentUser?.id}
          disabled={false}
          entity={entity}
          commentId={commentId}
          snippetId={snippetId}
        />
      )}
    </>
  )
}

export default Bookmark

import { useLazyQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'
import { useEffect } from 'react'
import { USER_DATA_QUERY } from 'src/pages/Queries/queries'
import BookmarksList from '../BookmarksList/BookmarksList'

interface Props {
  username: string
}

const UserCell = ({ username }: Props) => {
  const { currentUser, isAuthenticated } = useAuth()
  const loadPrivateUserData =
    currentUser?.id && isAuthenticated && currentUser?.username === username
  const [getUserData, { data, error, loading }] = useLazyQuery(USER_DATA_QUERY)

  useEffect(() => {
    // user is logged in viewing his profile
    if (loadPrivateUserData) {
      getUserData({
        variables: {
          id: currentUser?.id,
          fetchPrivateData: true,
        },
      })
    }

    // user is logged in, viewing someone elses profile or is not logged in viewing their profile
    // in any case they can only see public data of this username
    else {
      getUserData({
        variables: {
          id: currentUser?.id,
          fetchPrivateData: false,
        },
      })
    }
  }, [isAuthenticated])

  if (loading) {
    return (
      <div>{`Loading ${
        loadPrivateUserData ? 'private' : 'public'
      } user data...`}</div>
    )
  }

  if (error) {
    return (
      <div>{`Error loading ${
        loadPrivateUserData ? 'private' : 'public'
      } user data...`}</div>
    )
  }

  const savedBookmarks = data?.user?.bookmarks?.filter((bookmark) => bookmark.entityType === 'SNIPPET')
  const savedSnippets = savedBookmarks?.map(bookmark => bookmark.snippet)

  return (
    <div>
      {savedSnippets && (
        <BookmarksList snippets={savedSnippets} />
      )}
    </div>
  )
}

export default UserCell

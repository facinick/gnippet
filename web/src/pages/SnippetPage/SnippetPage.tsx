import { useLazyQuery } from '@apollo/client'
import Container from '@mui/material/Container'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useEffect } from 'react'
import { generateAndGetIDedFingerprint } from 'src/3rdParty/fingerprint'
import SnippetCell from 'src/components/SnippetCell'
import FingerprintStorage from 'src/utils/fingerprintStorage'
import { VIEW_COUNT_MUTATION } from '../../graphql/mutations'
import { USER_BOOKMARKS_QUERY, USER_VOTES_QUERY } from '../../graphql/queries'

interface Props {
  id: number
}

const getSnippetLSID = (id: number) => {
  return `Snippet:${String(id)}`
}

const SnippetPage = ({ id }: Props) => {
  const [increaseViewCount, { data, loading, error }] =
    useMutation(VIEW_COUNT_MUTATION)
  const { isAuthenticated, currentUser } = useAuth()
  const [getLoggedInUserVotesData] = useLazyQuery(USER_VOTES_QUERY)
  const [getLoggedInUserBookmarksData] = useLazyQuery(USER_BOOKMARKS_QUERY)

  useEffect(() => {
    // check if local storage has fingerprint
    // if it does, assume user has already visited and do nothing
    if (FingerprintStorage.getInstance().hasFingerprintWithId(getSnippetLSID(id))) {
    }

    // maybe a new user,
    // generate fingerprint and send request to increase count
    // with the generated fingerprint
    else {
      generateAndGetIDedFingerprint(getSnippetLSID(id)).then(
        (fingerprintId) => {
          FingerprintStorage.getInstance().setFingerprintWithId(
            getSnippetLSID(id),
            fingerprintId
          )
          return increaseViewCount({
            variables: {
              id,
              fingerprintId,
            },
          })
        }
      )
    }
  }, [])

  useEffect(() => {
    if (currentUser?.id && isAuthenticated) {
      getLoggedInUserVotesData({
        variables: {
          userId: currentUser.id,
        },
      })
      getLoggedInUserBookmarksData({
        variables: {
          userId: currentUser.id,
        },
      })
    }
  }, [isAuthenticated])

  return (
    <>
      <MetaTags title="Snippet" description="Snippet page" />
      <Container maxWidth="md">
        <SnippetCell id={id} />
      </Container>
    </>
  )
}

export default SnippetPage

import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import SnippetCell from 'src/components/SnippetCell'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'
import { USER_VOTES_QUERY, USER_BOOKMARKS_QUERY } from '../Queries/queries'
import { useLazyQuery } from '@apollo/client'
import { generateAndGetFingerprint, generateAndGetIDedFingerprint } from 'src/3rdParty/fingerprint'
import FingerprintStorage from 'src/utils/fingerprintStorage'

const VIEW_COUNT_MUTATION = gql`
  mutation FindViewCountQuery($id: Int!, $fingerprintId: String!) {
    increaseViewCount(id: $id, input: { fingerprintId: $fingerprintId }) {
      viewCount
    }
  }
`
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

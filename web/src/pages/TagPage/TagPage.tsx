import { MetaTags } from '@redwoodjs/web'
import { TagSnippetsCell } from 'src/components/TagSnippetsCell/TagSnippetsCell'
import { Container, Stack, Typography, Box } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'
import { USER_VOTES_QUERY, USER_BOOKMARKS_QUERY } from '../Queries/queries'
import Space from 'src/components/Space/Space'

const TagPage = ({name} : {name: string}) => {

const { isAuthenticated, currentUser } = useAuth()

const [getLoggedInUserVotesData] = useLazyQuery(USER_VOTES_QUERY)

const [getLoggedInUserBookmarksData] = useLazyQuery(USER_BOOKMARKS_QUERY)

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
      <MetaTags title="Tag" description={`${name} Tag page`} />
      <Container maxWidth="md">
        <Typography variant="h4">
          Topic
          <Space />
          <Typography sx={{display: 'inline'}} color={'primary'} variant="h4">
            #{name}
          </Typography>
        </Typography>
        <Box sx={{height: 40}} />
        <TagSnippetsCell name={name} />
      </Container>
    </>
  )
}

export default TagPage

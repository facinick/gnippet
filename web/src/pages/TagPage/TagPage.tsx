import { useLazyQuery } from '@apollo/client'
import { Box, Container, Typography } from '@mui/material'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { useEffect } from 'react'
import Space from 'src/components/Space/Space'
import { TagSnippetsCell } from 'src/components/TagSnippetsCell/TagSnippetsCell'
import { USER_BOOKMARKS_QUERY, USER_VOTES_QUERY } from '../../graphql/queries'

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

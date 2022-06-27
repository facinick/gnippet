import Button from '@mui/material/Button'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import { TagSnippetsCell } from 'src/components/TagSnippetsCell/TagSnippetsCell'
import { useApolloClient } from '@apollo/client'
import {QUERY as SnippetsByTags} from 'src/components/TagCell/TagCell'
import { Container, Stack } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'
import { USER_VOTES_QUERY, USER_BOOKMARKS_QUERY } from '../Queries/queries'

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
        <TagSnippetsCell name={name} />
      </Container>
    </>
  )
}

export default TagPage

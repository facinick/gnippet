import { MetaTags } from '@redwoodjs/web'
import SnippetsCell from 'src/components/SnippetsCell'
import { useAuth } from '@redwoodjs/auth'
import SnippetForm from 'src/components/SnippetForm/SnippetForm'
import Container from '@mui/material/Container'
// import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import { navigate, useLocation } from '@redwoodjs/router'
import { useEffect, useMemo } from 'react'
import { USER_VOTES_QUERY, USER_BOOKMARKS_QUERY } from '../Queries/queries'
import { useLazyQuery } from '@apollo/client'
import Card, { CardProps } from '@mui/material/Card'
import { useReactiveVar } from '@apollo/client'
import { styled } from '@mui/material/styles'
import {
  DEFAULT_HOME_FEEED_SORT_BY,
  HomeFeedSortBy,
  ITEMS_PER_PAGE,
  homeFeedSortByValues,
  setSortBy,
  sortByVar,
} from 'src/localStore/homeFeedSortBy'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionProps,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const CreateSnippetAccordian = styled(Accordion)<AccordionProps>(
  ({ theme }) => ({
    color: theme.palette.containerPrimary.contrastText,
    backgroundColor: theme.palette.containerPrimary.main,
  })
)

const getOrderByFromURL = (pathname: string): string | undefined => {
  return pathname.split('/')?.[1]
}

const getRequestedOrderBy = (pathname: string): HomeFeedSortBy => {
  const orderByFromURL = getOrderByFromURL(pathname) as HomeFeedSortBy
  return homeFeedSortByValues.includes(orderByFromURL)
    ? orderByFromURL
    : DEFAULT_HOME_FEEED_SORT_BY
}

const HomePage = ({ page = 0 }: { page?: number }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const { pathname } = useLocation()
  const skip = page * ITEMS_PER_PAGE
  const sortBy = useMemo(() => getRequestedOrderBy(pathname), [pathname])
  const isHomePage = page === 0
  const showSnippetForm = isAuthenticated && isHomePage

  useEffect(() => {
    setSortBy({ field: sortBy })
  }, [])

  // upon change of sort by from select component
  // navigate to new sortby URL
  const selectedSortByOption = useReactiveVar(sortByVar)
  useEffect(() => {
    navigate(`/${selectedSortByOption}/${page}`)
  }, [selectedSortByOption])

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
      <MetaTags title="Home" description="Home page" />
      <Container maxWidth="md">
        <Stack spacing={5}>
          {/****** Create a Post ******/}
          {showSnippetForm && (
            <CreateSnippetAccordian>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Post Snippet
              </AccordionSummary>
              <AccordionDetails>
                <SnippetForm
                  authorUsername={currentUser?.username}
                  authorId={currentUser?.id}
                />
              </AccordionDetails>
            </CreateSnippetAccordian>
          )}
          {/******** All Posts ********/}
          <SnippetsCell
            sortBy={sortBy}
            page={page}
            skip={skip}
            take={ITEMS_PER_PAGE}
          />
        </Stack>
      </Container>
    </>
  )
}

export default HomePage

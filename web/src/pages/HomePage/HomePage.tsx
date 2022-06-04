import { MetaTags } from '@redwoodjs/web'
import SnippetsCell from 'src/components/SnippetsCell'
import { useAuth } from '@redwoodjs/auth'
import SnippetForm from 'src/components/SnippetForm/SnippetForm'
import Container from '@mui/material/Container'
// import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import { navigate, useLocation } from '@redwoodjs/router'
import { useEffect } from 'react'
import { USER_VOTES_QUERY, USER_BOOKMARKS_QUERY } from '../Queries/queries'
import { useLazyQuery } from '@apollo/client'
import Card, { CardProps } from '@mui/material/Card'
import { useReactiveVar } from '@apollo/client'
import { styled } from '@mui/material/styles'
import { setSortBy, sortByVar } from 'src/localStore/homeFeedSortBy'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionProps,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const CreateSnippetCard = styled(Card)<CardProps>(({ theme }) => ({
  color: theme.palette.containerPrimary.contrastText,
  backgroundColor: theme.palette.containerPrimary.main,
}))

const CreateSnippetAccordian = styled(Accordion)<AccordionProps>(
  ({ theme }) => ({
    color: theme.palette.containerPrimary.contrastText,
    backgroundColor: theme.palette.containerPrimary.main,
  })
)

const HomePage = ({ page }: { page?: number }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const _page = !isNaN(page) ? Number(page) : 0
  const _skip = !isNaN(page) ? Number(page) * 5 : 0
  const { pathname } = useLocation()
  const sortBy = pathname.split('/')[1]
  const _sortBy =
    sortBy === 'activity' || sortBy === 'new' || sortBy === 'score'
      ? sortBy
      : 'new'
  const _take = 5
  const isHomePage = _page === 0
  const showSnippetForm = isAuthenticated && isHomePage

  useEffect(() => {
    setSortBy({ field: _sortBy })
  }, [])

  const esortBy = useReactiveVar(sortByVar)

  useEffect(() => {
    navigate(`/${esortBy}/${_page}`)
  }, [esortBy])

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
            sortBy={_sortBy}
            page={_page}
            skip={_skip}
            take={_take}
          />
        </Stack>
      </Container>
    </>
  )
}

export default HomePage

import Container from '@mui/material/Container'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import SnippetForm from 'src/components/SnippetForm/SnippetForm'
import SnippetsCell from 'src/components/SnippetsCell'
// import Card from '@mui/material/Card'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box
} from '@mui/material'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { navigate, useLocation } from '@redwoodjs/router'
import { useEffect, useMemo, useRef } from 'react'
import {
  DEFAULT_HOME_FEEED_SORT_BY,
  HomeFeedSortBy,
  homeFeedSortByValues,
  ITEMS_PER_PAGE,
  setSortBy,
  sortByVar
} from 'src/localStore/homeFeedSortBy'
import { polkav2 } from 'src/styles/backgrounds'
import { USER_BOOKMARKS_QUERY, USER_VOTES_QUERY } from '../../graphql/queries'
import LottieAnimation from 'src/lottie/Animation'
import confettiAnimation from 'src/lottie/assets/confetti-spread.json'

const CreateSnippetAccordian = styled(Accordion)<AccordionProps>(
  ({ theme }) => ({
    color: theme.palette.containerPrimary.contrastText,
    backgroundColor: polkav2({
      color: theme.palette.containerPrimary.contrastText,
      background: theme.palette.containerPrimary.main,
    }),
    borderRadius: '20px !important',
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
  const confettiAnimationRef = useRef<typeof LottieAnimation>()
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

  const onSnippetCreated = () => {
    confettiAnimationRef?.current.replay()
  }

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
                  onSubmit={onSnippetCreated}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    pointerEvents: 'none',
                  }}
                >
                  <LottieAnimation
                    ref={confettiAnimationRef}
                    autoplay={false}
                    loop={false}
                    animationDataJSON={confettiAnimation}
                  />
                </Box>
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

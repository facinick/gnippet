import { MetaTags } from '@redwoodjs/web'
import SnippetsCell from 'src/components/SnippetsCell'
import { useAuth } from '@redwoodjs/auth'
import SnippetForm from 'src/components/SnippetForm/SnippetForm'
import Container from '@mui/material/Container'
// import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import { useEffect } from 'react'
import { USER_VOTES_QUERY, USER_BOOKMARKS_QUERY } from '../Queries/queries'
import { useLazyQuery } from '@apollo/client';
import Card, { CardProps } from '@mui/material/Card';

import { styled } from '@mui/material/styles';

const CreateSnippetCard = styled(Card)<CardProps>(({ theme }) => ({
  color: theme.palette.containerPrimary.contrastText,
  backgroundColor: theme.palette.containerPrimary.main,
}));

const HomePage = ({ page }: { page: number }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const _page = page ? page : 0
  const _skip = page ? page * 5 : 0
  const _take = 5
  const isHomePage = _page === 0
  const showSnippetForm = isAuthenticated && isHomePage

  const [getLoggedInUserVotesData] = useLazyQuery(
    USER_VOTES_QUERY);

  const [getLoggedInUserBookmarksData] = useLazyQuery(
    USER_BOOKMARKS_QUERY);

  useEffect(() => {

    if(currentUser?.id && isAuthenticated) {
      getLoggedInUserVotesData({
        variables: {
          userId: currentUser.id,
        }
      })
      getLoggedInUserBookmarksData({
        variables: {
          userId: currentUser.id,
        }
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
            <CreateSnippetCard>
              <CardContent>
                <SnippetForm authorUsername={currentUser?.username} authorId={currentUser?.id} />
              </CardContent>
            </CreateSnippetCard>
          )}
          {/******** All Posts ********/}
          <SnippetsCell page={_page} skip={_skip} take={_take} />
        </Stack>
      </Container>
    </>
  )
}

export default HomePage

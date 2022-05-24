import { MetaTags } from '@redwoodjs/web'
import SnippetsCell from 'src/components/SnippetsCell'
import { useAuth } from '@redwoodjs/auth'
import SnippetForm from 'src/components/SnippetForm/SnippetForm'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

const HomePage = ({ page }: { page: number }) => {
  const { isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Container maxWidth="sm">
        <Stack spacing={5}>
          {/****** Create a Post ******/}
          {isAuthenticated && (
            <Card variant="outlined">
              <CardContent>
                <SnippetForm authorId={currentUser?.id} />
              </CardContent>
            </Card>
          )}
          {/******** All Posts ********/}
          <SnippetsCell page={page ? page : 0} skip={page ? page * 5 : 0} take={5} />
        </Stack>

        {/******** Trending Posts ********/}
        {/******** Trending Comments ********/}
      </Container>
    </>
  )
}

export default HomePage

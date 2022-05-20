import { MetaTags, useQuery } from '@redwoodjs/web'
import SnippetsCell from 'src/components/SnippetsCell'
import { useAuth } from '@redwoodjs/auth'
import SnippetForm from 'src/components/SnippetForm/SnippetForm'
import { gql } from '@apollo/client'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

const HomePage = () => {
  const { isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Container maxWidth="sm">
        <Stack spacing={5}>
          {isAuthenticated &&
            <Card variant="outlined">
              <CardContent>
                <SnippetForm authorId={currentUser?.id} />
              </CardContent>
            </Card>
          }
        <SnippetsCell />
        </Stack>
      </Container>
    </>
  )
}

export default HomePage

import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SnippetCell from 'src/components/SnippetCell'
import CommentsCell from 'src/components/CommentsCell'
import CommentForm from 'src/components/CommentForm/CommentForm'
import { useAuth } from '@redwoodjs/auth'
import Typography from '@mui/material/Typography'
interface Props {
  id: number
}

const SnippetPage = ({ id }: Props) => {

  const { currentUser, isAuthenticated } = useAuth()

  return (
    <>
      <MetaTags title="Snippet" description="Snippet page" />

      <Container maxWidth="sm">
        <Stack spacing={5}>
          <SnippetCell id={id}></SnippetCell>
          { isAuthenticated && <CommentForm snippetId={id} authorId={currentUser.id} /> }
          <CommentsCell snippetId={id} />
        </Stack>
      </Container>

    </>
  )
}

export default SnippetPage

import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SnippetCell from 'src/components/SnippetCell'
import CommentsCell from 'src/components/CommentsCell'
interface Props {
  id: number
}

const SnippetPage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="Snippet" description="Snippet page" />

      <Container maxWidth="sm">
        <Stack spacing={5}>

          <SnippetCell id={id}></SnippetCell>
          <CommentsCell snippetId={id} />
        </Stack>
      </Container>

    </>
  )
}

export default SnippetPage

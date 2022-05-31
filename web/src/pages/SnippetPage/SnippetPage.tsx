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
import { useEffect } from 'react'
import { USER_VOTES_QUERY, USER_BOOKMARKS_QUERY } from '../Queries/queries'
import { useLazyQuery } from '@apollo/client';
interface Props {
  id: number
}

const SnippetPage = ({ id }: Props) => {
  const { isAuthenticated, currentUser } = useAuth()
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
      <MetaTags title="Snippet" description="Snippet page" />
      <Container maxWidth="md">
        <SnippetCell id={id} />
      </Container>
    </>
  )
}

export default SnippetPage

import { MetaTags } from '@redwoodjs/web'
import SnippetsCell from 'src/components/SnippetsCell'
import { useAuth } from '@redwoodjs/auth';
import SnippetForm from 'src/components/SnippetForm/SnippetForm';

const HomePage = () => {
  const { isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      { isAuthenticated && <SnippetForm authorId={currentUser?.id} /> }
      <SnippetsCell />
    </>
  )
}

export default HomePage

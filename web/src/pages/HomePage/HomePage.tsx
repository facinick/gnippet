import { MetaTags, useQuery } from '@redwoodjs/web'
import SnippetsCell from 'src/components/SnippetsCell'
import { useAuth } from '@redwoodjs/auth';
import SnippetForm from 'src/components/SnippetForm/SnippetForm';
import { gql } from '@apollo/client';
import { useEffect } from 'react';

export const UserDataQuery = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      isBanned
      username
      roles
      snippets {
        id
        title
        body
        createdAt
        activity
        score
        author {
          username
        }
      }
      votes {
        id
        snippetId
        commentId
        userId
        type
      }
      bio
      avatarUrl
      createdAt
    }
  }
`

const HomePage = () => {
  const { isAuthenticated, currentUser } = useAuth()

  // useEffect(()=> {

  //   if(isAuthenticated) {
  //     useQuery(UserDataQuery);
  //   }

  // }, [isAuthenticated])

  // const { loading, error, data } = useQuery(UserDataQuery);

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      { isAuthenticated && <SnippetForm authorId={currentUser?.id} /> }
      <SnippetsCell />
    </>
  )
}

export default HomePage

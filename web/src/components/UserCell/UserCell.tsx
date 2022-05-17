import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Snippet from '../Snippet/Snippet'

export const QUERY = gql`
  query FindUserQuery($username: String!) {
    user: userByUsername(username: $username) {
      username
      avatarUrl
      bio
      snippets(input: { orderBy: { createdAt: asc }}) {
        id
        title
        body
        author {
          username
        }
        comments(input: { skip: 0, take: 1, ignoreChildComments: true }) {
          id
          author {
            username
          }
          body
          parentCommentId
        }
        createdAt
        activity
        score
      }
      comments {
        body
        snippet {
          title
        }
      }
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = (props) =>{
  return(<div>User Not Found</div>)
}

export const Failure = ({
  error,
}: CellFailureProps<FindUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindUserQuery, FindUserQueryVariables>) => {

  const {username, bio, snippets} = user

  console.log(snippets);

  return (
    <>
      <h4>@{username}</h4>
      <p>{bio}</p>
      { snippets.map((snippet) => <Snippet key={snippet.id} snippet={snippet} />) }
    </>
  )
}

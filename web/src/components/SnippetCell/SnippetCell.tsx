import type { FindSnippetQuery, FindSnippetQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Snippet from '../Snippet/Snippet'

export const QUERY = gql`
  query FindSnippetQuery($id: Int!) {
    snippet(id: $id) {
      id
      score
      title
      body
      createdAt
      author {
        username
      }
      comments {
        id
        createdAt
        body
        author {
          username
        }
        parentCommentId
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSnippetQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  snippet,
}: CellSuccessProps<FindSnippetQuery, FindSnippetQueryVariables>) => {

  return (
    <>
       <Snippet key={snippet.id} snippet={snippet}></Snippet>
    </>
  )
}

import type { FindSnippetQuery, FindSnippetQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Snippet from '../Snippet/Snippet'
import { _Vote } from 'src/gql_objects/gqlObjects'

export const QUERY = gql`
  query FindSnippetQuery($id: Int!) {
    snippet(id: $id) {
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
  snippet
}: CellSuccessProps<FindSnippetQuery, FindSnippetQueryVariables>) => {

  return (
    <>
       <Snippet showBackButton={true} showActivity={false} truncate={false} key={snippet.id} snippet={snippet} />
    </>
  )
}

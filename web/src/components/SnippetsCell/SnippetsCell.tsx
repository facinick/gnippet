import type { SnippetsQuery, Vote } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Snippet from 'src/components/Snippet/Snippet'
import { _Vote } from 'src/gql_objects/gqlObjects';

export const QUERY = gql`
  query SnippetsQuery {
    snippets(input: { orderBy: { createdAt: desc }}) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ snippets}: CellSuccessProps<SnippetsQuery> ) => {

  return (
    <>
      {snippets.map(snippet =>
        <Snippet
          key={snippet.id}
          snippet={snippet}
          truncate={true}
        />)
      }
    </>
  )
}

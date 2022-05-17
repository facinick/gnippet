import type { SnippetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Snippet from '../Snippet/Snippet'

export const QUERY = gql`
  query SnippetsQuery {
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
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ snippets }: CellSuccessProps<SnippetsQuery>) => {

  return (
    <>
      {snippets.map(snippet => <Snippet key={snippet.id} snippet={snippet} />)}
    </>
  )
}

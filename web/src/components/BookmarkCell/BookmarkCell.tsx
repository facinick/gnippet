import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import type { FindBookmarkQuery, FindBookmarkQueryVariables } from 'types/graphql'

export const QUERY = gql`
  query FindBookmarkQuery($id: Int!) {
    bookmark: bookmark(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindBookmarkQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  bookmark,
}: CellSuccessProps<FindBookmarkQuery, FindBookmarkQueryVariables>) => {
  return <div>{JSON.stringify(bookmark)}</div>
}

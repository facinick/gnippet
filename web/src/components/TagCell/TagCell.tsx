import type { FindTagQuery, FindTagQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindTagQuery($id: Int!) {
    tag: tag(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTagQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  tag,
}: CellSuccessProps<FindTagQuery, FindTagQueryVariables>) => {
  return <div>{JSON.stringify(tag)}</div>
}

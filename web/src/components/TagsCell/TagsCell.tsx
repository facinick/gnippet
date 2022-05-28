import type { TagsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import TagSearchAndAdd from '../TagSearchAndAdd/TagSearchAndAdd'

export const QUERY = gql`
  query TagsQuery {
    tags {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading tags...</div>

export const Empty = ({ setTags }: {setTags: (tags) => void}) => {
  return (
    <>
      <TagSearchAndAdd setTags={setTags} />
    </>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ tags, setTags }: CellSuccessProps<TagsQuery> & {setTags: (tags) => void}) => {
  return (
    <>
      <TagSearchAndAdd setTags={setTags} />
    </>
  )
}

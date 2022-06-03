import type { TagsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import TagSearchAndAdd from '../TagSearchAndAdd/TagSearchAndAdd'
import Meta from '../Meta/Meta'

export const QUERY = gql`
  query TagsQuery {
    tags {
      id
      name
    }
  }
`

export const Loading = () => <Meta size={'skinny'} loading={true}/>

export const Failure = ({ error }: UserQueryVariables) => <Meta error={true} message={error.message} />

export const Empty = ({ setTags }: {setTags: (tags) => void}) => {
  return (
    <>
      <TagSearchAndAdd setTags={setTags} />
    </>
  )
}

export const Success = ({ tags, setTags }: CellSuccessProps<TagsQuery> & {setTags: (tags) => void}) => {

  return (
    <>
      <TagSearchAndAdd setTags={setTags} />
    </>
  )
}

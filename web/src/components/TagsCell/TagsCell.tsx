import type { TagsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import TagSearchAndAdd from '../TagSearchAndAdd/TagSearchAndAdd'
import Meta from '../Meta/Meta'
import { useEffect, useRef } from 'react'

export const QUERY = gql`
  query TagsQuery {
    tags {
      id
      name
    }
  }
`

export const Loading = () => <Meta size={'skinny'} loading={true} />

export const Failure = ({ error }: UserQueryVariables) => (
  <Meta error={true} message={error.message} />
)

export const Empty = ({
  setTags,
  setTagsRef,
  disable,
}: {
  setTags: (tags) => void
  setTagsRef: (ref) => void
  disable: boolean
}) => {
  const childRef = useRef()

  useEffect(() => {
    if (childRef?.current) {
      setTagsRef(childRef)
    }
  }, [childRef])

  return (
    <>
      <TagSearchAndAdd disable={disable} setTags={setTags} />
    </>
  )
}

export const Success = ({
  tags,
  setTags,
  setTagsRef,
  disable,
}: CellSuccessProps<TagsQuery> & {
  setTags: (tags) => void
  setTagsRef: (ref) => void
  disable: boolean
}) => {
  const childRef = useRef()

  useEffect(() => {
    if (childRef?.current) {
      setTagsRef(childRef)
    }
  }, [childRef])

  return (
    <>
      <TagSearchAndAdd disable={disable} ref={childRef} setTags={setTags} />
    </>
  )
}

import type { FindSnippetQuery, FindSnippetQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Snippet from '../Snippet/Snippet'
import { _Vote } from 'src/gql_objects/gqlObjects'
import Meta from '../Meta/Meta'

export const QUERY = gql`
  query FindSnippetQuery($id: Int!) {
    snippet(id: $id) {
      id
      title
      body
      createdAt
      activity
      imageUrl
      score
      author {
        username
      }
      tags {
        id
        name
      }
      comments(input: { orderBy: { createdAt: desc }} ) {
        id
        body
        score
        author {
          username
        }
        createdAt
      }
    }
  }
`

export const Loading = () => <Meta loading={true}/>

export const Empty = () => <Meta empty={true} message={"Snippet doesn't exist!"}/>

export const Failure = ({
  error,
}: CellFailureProps<FindSnippetQueryVariables>) =>  <Meta error={true} message={error.message} />

export const Success = ({
  snippet
}: CellSuccessProps<FindSnippetQuery, FindSnippetQueryVariables>) => {

  return (
    <><Snippet showHeaderImage={false} showCommentsHeader={true} showCommentsForm={true} showComments={true} showBackButton={true} showActivity={false} truncate={false} key={snippet.id} snippet={snippet} /></>
  )
}

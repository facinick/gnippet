import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import type {
  FindSnippetQuery,
  FindSnippetQueryVariables
} from 'types/graphql'
import Meta from '../Meta/Meta'
import Snippet from '../Snippet/Snippet'

export const QUERY = gql`
  query FindSnippetQuery($id: Int!) {
    snippet(id: $id) {
      id
      title
      body
      createdAt
      activity
      imageUrl
      viewCount
      score
      author {
        username
      }
      tags {
        id
        name
      }
      comments(input: { orderBy: { createdAt: desc } }) {
        id
        body
        score
        parentCommentId
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
      <Snippet
        showReadingTimeBottom={false}
        showHeaderImage={false}
        showViewCount={true}
        showCommentsHeader={true}
        showCommentsForm={true}
        showComments={true}
        showBackButton={true}
        showActivity={false}
        truncate={false}
        key={snippet.id}
        snippet={snippet}
      />
  )
}

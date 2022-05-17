import type { FindSnippetQuery, FindSnippetQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindSnippetQuery($id: Int!) {
    snippet(id: $id) {
      id
      score
      title
      body
      createdAt
      author {
        username
      }
      comments {
        id
        createdAt
        body
        author {
          username
        }
        parentCommentId
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
  snippet,
}: CellSuccessProps<FindSnippetQuery, FindSnippetQueryVariables>) => {

  const snippetHasComments = snippet.comments.length > 0

  return (
    <>
       <article key={snippet.id}>
            <header>
              <h1>{snippet.title}</h1>
            </header>
            <p>{snippet.body} - {snippet.author.username}</p>
            <div>Posted at: {snippet.createdAt}</div>
            <span>score: {snippet.score}</span>
            { snippetHasComments &&  <>
                {
                  snippet.comments.map((comment) => {
                    return (
                      <p key={comment.id}>{comment.body} by {comment.author.username}</p>
                    )
                  })
                }
              </>
            }
          </article>
    </>
  )
}

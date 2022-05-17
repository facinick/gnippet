import type { SnippetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query SnippetsQuery {
    snippets(input: { orderBy: { createdAt: asc }}) {
      id
      title
      body
      createdAt
      author {
        username
      }
      comments {
        id
        author {
          username
        }
        body
      }
      #ordering
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
      {snippets.map((item) => {
        return (
          <article key={item.id}>
            <header>
              <h2>{item.title}</h2>
            </header>
            <p>{item.body} - {item.author.username}</p>
            <div>Posted at: {item.createdAt}</div>
            activity: {item.activity}
            score: {item.score}

            {
              item.comments.map((comment) => {
                return (
                  <p key={comment.id}>{comment.body}</p>
                )
              })
            }
          </article>
        )
      })}
    </>
  )
}

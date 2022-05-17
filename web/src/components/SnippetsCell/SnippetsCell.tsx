import type { SnippetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

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
      {snippets.map((item) => {

        const snippetHasComments = item.comments.length > 0

        return (
          <article key={item.id}>
            <header>
              <Link to={routes.snippet({ id: item.id })}>{item.title}</Link>
            </header>
            <p>{item.body} - {item.author.username}</p>
            <div>Posted at: {item.createdAt}</div>
            <span>activity: {item.activity}</span> <span>score: {item.score}</span>
            { snippetHasComments &&  <>
              <p>latest comment:</p>
                {
                  item.comments.map((comment) => {
                    return (
                      <p key={comment.id}>{comment.body} by {comment.author.username}</p>
                    )
                  })
                }
              </>
            }
          </article>
        )
      })}
    </>
  )
}

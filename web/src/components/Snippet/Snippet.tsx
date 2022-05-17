import { Link, routes } from "@redwoodjs/router";
import { Snippet as SnippetType } from "types/graphql"

type Props = {
  snippet: SnippetType;
}

const Snippet = (props: Props) => {

  const { id, title, score, activity, author, body, createdAt, comments } = props.snippet
  const snippetHasComments = comments.length > 0

  return (<article key={id}>
      <header>
        <Link to={routes.snippet({ id: id })}>{title}</Link>
      </header>
      <p>{body} - {author.username}</p>
      <div>Posted at: {createdAt}</div>
      <span>activity: {activity}</span> <span>score: {score}</span>
      { snippetHasComments &&  <>
        <p>latest comment:</p>
          {
            comments.map((comment) => {
              return (
                <p key={comment.id}>{comment.body} by {comment.author.username}</p>
              )
            })
          }
        </>
      }
    </article>)
}

export default Snippet

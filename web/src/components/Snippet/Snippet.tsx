import Box from "@mui/material/Box";
import { Link, routes } from "@redwoodjs/router";
import { _Snippet } from "src/gql_objects/gqlObjects";
import { truncate as returnTruncatedText } from 'src/utils/stringUtils'
import CreatedAt from "../CreatedAt/CreatedAt";
import Username from "../Username/Username";

type Props = {
  snippet: _Snippet
  truncate: boolean
}

const ControlledSnippet = ({ snippet, truncate }: Props) => {

  const { id, title, score, activity, author, body, createdAt } = snippet

  const newBody = truncate ? returnTruncatedText(body, 150) : body

  return (
    <Box sx={{
      bgcolor: 'background.default',
      color: 'text.primary',
    }}>
      <article key={id}>
        <header>
          <Link to={routes.snippet({ id: id })}>{title}</Link>
        </header>
        { truncate && <p>{newBody} <Link to={routes.snippet({ id: id })}>[read_more]</Link> - {<Username username={author.username} />}</p>}
        {!truncate && <p>{newBody} - {<Username username={author.username} />}</p>}
        <div>{<CreatedAt createdAt={createdAt} />}</div>
        <span>no. comments: {activity}</span> <span>votes: {score}</span>
      </article>
  </Box>)
}

export default ControlledSnippet

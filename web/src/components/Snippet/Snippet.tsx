import Box from "@mui/material/Box";
import { useAuth } from "@redwoodjs/auth";
import { Link, routes } from "@redwoodjs/router";
import { useQuery } from "@redwoodjs/web";
import { useEffect, useState } from "react";
import { _Snippet, _SnippetWithVotes, _Vote } from "src/gql_objects/gqlObjects";
import { UserDataQuery } from "src/pages/HomePage/HomePage";
import { truncate as returnTruncatedText } from 'src/utils/stringUtils'
import CreatedAt from "../CreatedAt/CreatedAt";
import Username from "../Username/Username";
import Voting from "../Voting/Voting";

type Props = {
  snippet: _Snippet
  truncate: boolean
}

const ControlledSnippet = ({ snippet, truncate }: Props) => {

  const { id, title, score, activity, author, body, createdAt } = snippet

  const [vote, setVote] = useState<0|1|-1>(0)

  const newBody = truncate ? returnTruncatedText(body, 150) : body

  const { isAuthenticated, currentUser } = useAuth()

  const allowVoting = isAuthenticated && currentUser?.id

  const { loading, error, data } = useQuery(UserDataQuery, {
    variables: {
      id: currentUser?.id
    }
  });

  useEffect(() => {

    if(!data || error) {
      return
    }

    const votes: Array<_Vote> = data.user.votes
    const matchedVotes = votes.filter((vote) => vote.snippetId === id && vote.userId === currentUser?.id)

    if(matchedVotes.length === 1) {
      setVote(matchedVotes[0].type === 'UPVOTE' ? 1 : matchedVotes[0].type === 'DOWNVOTE' ? -1 : 0)
    } else {
      setVote(0)
    }

  }, [data])

  return (
      <article key={id}>
        <header>
          <Link to={routes.snippet({ id: id })}>{title}</Link>
        </header>
        { truncate && <p>{newBody} <Link to={routes.snippet({ id: id })}>[read_more]</Link> - {<CreatedAt createdAt={createdAt} />} by {<Username username={author.username} />}</p>}
        {!truncate && <p>{newBody} - {<CreatedAt createdAt={createdAt} />} by {<Username username={author.username} />}</p>}
        { allowVoting && <Voting snippetId={id} votes={score} vote={vote} /> }
        <span>{activity} comments</span>
      </article>)
}

export default ControlledSnippet
function useApolloClient(): { cache: any; } {
  throw new Error("Function not implemented.");
}


import { useAuth } from "@redwoodjs/auth";
import { Link, routes } from "@redwoodjs/router";
import { useEffect, useState } from "react";
import { _Comment, _Snippet, _SnippetWithVotes, _Vote } from "src/gql_objects/gqlObjects";
import { USER_DATA_QUERY } from "src/pages/Queries/queries";
import { truncate as returnTruncatedText } from 'src/utils/stringUtils'
import CreatedAt from "../CreatedAt/CreatedAt";
import Username from "../Username/Username";
import Voting from "../Voting/Voting";
import { useApolloClient } from '@apollo/client'

type Props = {
  comment: _Comment
  snippetId: number
}

const Comment = ({ comment, snippetId }: Props) => {

  const { id, score, activity, author, body, createdAt } = comment

  const [vote, setVote] = useState<0|1|-1>(0)

  const { isAuthenticated, currentUser } = useAuth()

  const allowVoting = isAuthenticated && currentUser?.id

  const client = useApolloClient();

  const data = client.readQuery({
    query: USER_DATA_QUERY,
    variables: {
      id: currentUser?.id,
      snippets: false,
      votes: true
    },
  });

  useEffect(() => {

    if(!data) {
      return
    }

    const votes: Array<_Vote> = data.user.votes
    const matchedVotes = votes.filter((vote) => vote.snippetId === snippetId && vote.userId === currentUser?.id && vote.commentId === id)

    console.log(votes)

    if(matchedVotes.length === 1) {
      setVote(matchedVotes[0].type === 'UPVOTE' ? 1 : matchedVotes[0].type === 'DOWNVOTE' ? -1 : 0)
    } else {
      setVote(0)
    }

  }, [data])

  return (
      <article key={id}>
        <p>{body} - {<CreatedAt createdAt={createdAt} />} by {<Username username={author.username} />}</p>
        { allowVoting && <Voting commentId={id} entity={'COMMENT'} snippetId={snippetId} votes={score} vote={vote} /> }
        <span>{activity} replies</span>
      </article>)
}

export default Comment
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
  const { isAuthenticated, currentUser } = useAuth()
  const [vote, setVote] = useState<0 | 1 | -1>(0)
  const client = useApolloClient();

  const data = client.readQuery({
    query: USER_DATA_QUERY,
    variables: {
      id: currentUser?.id,
      snippets: false,
      votes: true,
      comments: false,
    },
  });

  useEffect(() => {
    if(!data?.user) {
      return
    }

    const vote = data.user.votes.find(
      (vote) => vote.snippetId === snippetId && vote.entityType === 'COMMENT' && vote.commentId === id
    )

    setVote(vote ? vote.value as 1 | -1 | 0 : 0)
  }, [data])

  return (
      <article key={id}>
        <p>{body} - <i className="created-at"> {<CreatedAt createdAt={createdAt} />} by {<Username username={author.username} />}</i> </p>
        { isAuthenticated && <Voting commentId={id} entity={'COMMENT'} snippetId={snippetId} votes={score} vote={vote} /> }
        {/* <span>{activity} replies</span> */}
      </article>)
}

export default Comment
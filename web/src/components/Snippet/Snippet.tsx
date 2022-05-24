import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { _Snippet, _SnippetWithVotes, _Vote } from 'src/gql_objects/gqlObjects'
import { USER_DATA_QUERY } from 'src/pages/Queries/queries'
import { truncate as returnTruncatedText } from 'src/utils/stringUtils'
import CreatedAt from '../CreatedAt/CreatedAt'
import Username from '../Username/Username'
import Voting from '../Voting/Voting'
import { useApolloClient } from '@apollo/client'
import BackButton from '../BackButton/BackButton'
import Stack from '@mui/material/Stack'

type Props = {
  snippet: _Snippet
  truncate: boolean
  showActivity: boolean
  showBackButton: boolean
}

const ControlledSnippet = ({ showBackButton, showActivity, snippet, truncate }: Props) => {
  const { id, title, score, activity, author, body, createdAt } = snippet
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
      (vote) => vote.snippetId === id && vote.entityType === 'SNIPPET'
    )

    setVote(vote ? vote.value as 1 | -1 | 0 : 0)
  }, [data])

  return (
    <article key={id}>
      <header>
        <Stack alignItems={'center'} spacing={1} direction={'row'}>
          { showBackButton && <BackButton /> }
          <Link to={routes.snippet({ id: id })}>{title}</Link>
        </Stack>
      </header>
      {truncate && (
        <p>
          {returnTruncatedText(body, 150)}
          <Link to={routes.snippet({ id: id })}>[read-more]</Link> -
          <i> {<CreatedAt createdAt={createdAt} />} by <span>{' '}</span>
          {<Username username={author.username} />}</i>
        </p>
      )}
      {!truncate && (
        <p>
          {body} - {<CreatedAt createdAt={createdAt} />} by{' '}
          {<Username username={author.username} />}
        </p>
      )}
      {isAuthenticated && (
        <Voting entity={'SNIPPET'} snippetId={id} votes={score} vote={vote} />
      )}
      {showActivity && (
        <p style={{marginBottom: 0}}>
          {activity} {activity === 1 ? 'comment' : 'comments'}
        </p>
      )}
    </article>
  )
}

export default ControlledSnippet

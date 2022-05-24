import type { SnippetsQuery, Vote } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Snippet from 'src/components/Snippet/Snippet'
import { _Vote } from 'src/gql_objects/gqlObjects'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

export const QUERY = gql`
  query SnippetsQuery {
    snippets(input: { orderBy: { createdAt: desc } }) {
      id
      title
      body
      createdAt
      activity
      score
      author {
        username
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ snippets }: CellSuccessProps<SnippetsQuery>) => {
  const numberOfSnippets = snippets.length
  let isLastSnippet: boolean = false
  let renderDivider: boolean = false
  return (
    <>
      <Stack spacing={5}>
        {snippets.map((snippet, index) => {
          isLastSnippet = (index === numberOfSnippets - 1) ? true : false
          renderDivider = !isLastSnippet
          return (
            <>
              <Snippet
                showBackButton = {false}
                showActivity = {true}
                key = {snippet.id}
                snippet = {snippet}
                truncate = {true}
              />
              { renderDivider && <Divider /> }
            </>
          )
        })}
      </Stack>
    </>
  )
}

import type { SnippetsQuery, Vote } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Snippet from 'src/components/Snippet/Snippet'
import { _Vote } from 'src/gql_objects/gqlObjects'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Pagination from '@mui/material/Pagination'
import { navigate } from '@redwoodjs/router'
import Box from '@mui/material/Box'

export const QUERY = gql`
  query SnippetsQuery($skip: Int!, $take:Int!) {
    snippets (input: { orderBy: { createdAt: desc }, skip: $skip, take: $take }) {
      data {
        id
        title
        body
        createdAt
        activity
        score
        author {
          username
        },
        tags {
          id
          name
        }
      }
      count
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  snippets,
  skip,
  take,
  page
}: CellSuccessProps<SnippetsQuery> & { skip: number, take: number, page: number }) => {
  const numberOfSnippets = snippets.data.length
  let isLastSnippet: boolean = false
  let renderDivider: boolean = false
  const snippetsPerPage = 5
  const totalSnippets = snippets.count
  const totalPages = Math.ceil(totalSnippets / snippetsPerPage)

  const handleChange = (event, value) => {
    navigate(`/new/${value - 1}`)
  }

  const spacing = 5

  return (
    <>
      <Stack spacing={spacing}>
        {snippets.data.map((snippet, index) => {
          isLastSnippet = index === numberOfSnippets - 1 ? true : false
          renderDivider = !isLastSnippet
          return (
            <Box key={snippet.id}>
              <Snippet
                showBackButton={false}
                showActivity={true}
                key={snippet.id}
                snippet={snippet}
                truncate={true}
              />
              {renderDivider && <Divider style={{paddingTop: `${spacing * 8}px`}} />}
            </ Box>
          )
        })}
      </Stack>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Pagination page={page + 1} onChange={handleChange}  count={totalPages} variant="outlined" />
      </div>
    </>
  )
}

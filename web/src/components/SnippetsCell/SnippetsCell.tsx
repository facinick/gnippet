import type { SnippetsQuery, SnippetOrderByInput } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Snippet from 'src/components/Snippet/Snippet'
import { _Vote } from 'src/gql_objects/gqlObjects'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Pagination from '@mui/material/Pagination'
import { navigate } from '@redwoodjs/router'
import Meta from '../Meta/Meta'
import HomeFeedSortBy from 'src/components/HomeFeedSortBy/HomeFeedSortBy'

export const QUERY = gql`
  query SnippetsQuery($skip: Int!, $take:Int!, $sortBy: SnippetOrderByInput!) {
    snippets (input: { orderBy: $sortBy, skip: $skip, take: $take }) {
      data {
        id
        title
        body
        createdAt
        activity
        score
        author {
          username
        }
        tags {
          id
          name
        }
        comments(input: { orderBy: { createdAt: desc }} ) {
          id
          body
          score
          author {
            username
          }
          createdAt
        }
      }
      count
    }
  }
`

export const Loading = () => {
  return <Meta loading={true}/>
}

export const Empty = () => <Meta empty={true} message={"Snippet doesn't exist!"}/>

export const Failure = ({ error }: CellFailureProps) => <Meta error={true} message={error.message} />

export const Success = ({
  snippets,
  skip,
  take,
  sortBy,
  page
}: CellSuccessProps<SnippetsQuery> & { skip: number, take: number, page: number, sortBy: string }) => {
  const numberOfSnippets = snippets.data.length
  let isLastSnippet: boolean = false
  let renderDivider: boolean = false

  const spacing = 5

  const snippetsPerPage = 5
  const totalSnippets = snippets.count
  const totalPages = Math.ceil(totalSnippets / snippetsPerPage)

  const handleChange = (event, value) => {
    navigate(`/${sortBy}/${value - 1}`)
  }

  return (
    <>
      <HomeFeedSortBy />
      <Stack spacing={spacing}>
        {snippets.data.map((snippet, index) => {
          isLastSnippet = index === numberOfSnippets - 1 ? true : false
          renderDivider = !isLastSnippet

          return (
            <React.Fragment key={snippet.id}>
              <Snippet
                showBackButton={false}
                showActivity={true}
                key={snippet.id}
                snippet={snippet}
                showComments={false}
                showCommentsForm={false}
                showCommentsHeader={false}
                truncate={true}
              />
              { renderDivider && <Divider /> }
            </ React.Fragment>
          )
        })}
      </Stack>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Pagination page={page + 1} onChange={handleChange}  count={totalPages} variant="outlined" />
      </div>
    </>
  )
}

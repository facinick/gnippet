import type { FindTagQuery, FindTagQueryVariables } from 'types/graphql'
import { CellSuccessProps, CellFailureProps, useQuery } from '@redwoodjs/web'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Snippet from '../Snippet/Snippet'
import Button from '@mui/material/Button'

export const QUERY = gql`
  query FindTagByNameQuery($take: Int!, $nextCursor: Int, $name: String!) {
    tagByName(name: $name) {
      id
      name
      snippets(input: { nextCursor: $nextCursor, take: $take }) {
        data {
          id
          title
          body
          createdAt
          imageUrl
          activity
          score
          author {
            username
          }
          tags {
            id
            name
          }
          comments(input: { orderBy: { createdAt: desc } }) {
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
        nextCursor
      }
    }
  }
`
interface Props {
  name: string
}

export const TagDCell = ({ name }: Props) => {
  const { data, loading, error, fetchMore } = useQuery(QUERY, {
    variables: {
      take: 1,
      nextCursor: null,
      name,
    },
  })

  // console.log(data)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const snippets = data.tagByName.snippets
  const numberOfSnippets = snippets.data.length
  let isLastSnippet: boolean = false
  let renderDivider: boolean = false

  const spacing = 5

  return (
    <>
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
                showHeaderImage={true}
                truncate={true}
              />
              {renderDivider && <Divider />}
            </React.Fragment>
          )
        })}
      </Stack>
      <Button
        onClick={() => {
          console.log({
            take: 1,
            name,
            nextCursor: data.tagByName.snippets.nextCursor,
          })

          fetchMore({
            variables: {
              take: 1,
              name,
              nextCursor: data.tagByName.snippets.nextCursor,
            },
          })
        }}
      >
        Fetch More
      </Button>
    </>
  )
}

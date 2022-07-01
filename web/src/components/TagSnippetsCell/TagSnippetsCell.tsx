import type { FindTagQuery, FindTagQueryVariables } from 'types/graphql'
import { CellSuccessProps, CellFailureProps, useQuery } from '@redwoodjs/web'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Snippet from '../Snippet/Snippet'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import ReplayIcon from '@mui/icons-material/Replay'
import CachedIcon from '@mui/icons-material/Cached'
import { useState } from 'react'
import Meta from '../Meta/Meta'
import { toast } from '@redwoodjs/web/dist/toast'
import { POSTS_PER_TAGS_PAGE } from 'src/admin/settings'
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

export const TagSnippetsCell = ({ name }: Props) => {
  const [noMoreResults, setNoMoreResults] = useState(false)
  const { data, loading, error, fetchMore } = useQuery(QUERY, {
    variables: {
      take: POSTS_PER_TAGS_PAGE,
      nextCursor: null,
      name,
    },
    notifyOnNetworkStatusChange: true,
  })

  if (!data) {
    return <Meta loading={true} />
  }


  if (data.tagByName === null) {
    return <Meta empty={true} message={`No snippets found with tag "${name}"`} />
  }

  if(error) {
    return <Meta error={true} message={error.message} />
  }

  const snippets = data?.tagByName.snippets
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
                showReadingTimeBottom={true}
                showActivity={true}
                showViewCount={false}
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
      <Box sx={{ height: '30px' }} />
      <LoadingButton
        onClick={() => {
          fetchMore({
            variables: {
              take: POSTS_PER_TAGS_PAGE,
              name,
              nextCursor: data.tagByName.snippets.nextCursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              const existingSnippets = prev?.tagByName?.snippets?.data
              const result = {
                tagByName: {
                  ...fetchMoreResult.tagByName,
                  snippets: {
                    ...fetchMoreResult.tagByName.snippets,
                    data: [
                      ...existingSnippets,
                      ...fetchMoreResult?.tagByName?.snippets?.data,
                    ],
                  },
                },
              }

              if (
                prev?.tagByName?.snippets?.nextCursor ===
                fetchMoreResult.tagByName.snippets.nextCursor
              ) {
                setNoMoreResults(true)
                toast('No more posts to load!')
              }

              if (!fetchMoreResult) return prev
              return result
            },
          })
        }}
        loadingPosition="start"
        startIcon={<CachedIcon />}
        loading={loading}
        disabled={noMoreResults}
        variant="outlined"
        title={noMoreResults ? 'Nothing More To Load' : 'Load More'}
      >
        {noMoreResults ? "No more data" : "Load More"}
      </LoadingButton>
    </>
  )
}

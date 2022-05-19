import { _Snippet, _SnippetWithComments } from 'src/gql_objects/gqlObjects'
import Snippet from './Snippet'

const snippet: _Snippet = {
  id: 1,
  title: "sample snippet",
  body: "this is how to multiply 2 into 2",
  createdAt: "2022-05-16T12:01:48Z",
  score: 0,
  activity: 0,
  author: {
    username: "facinick",
  }
}

const snippetWithComments: _SnippetWithComments = {
  id: 1,
  title: "sample snippet",
  body: "this is how to multiply 2 into 2",
  createdAt: "2022-05-16T12:01:48Z",
  comments: [
    {
      id: 1,
      createdAt: "2022-05-16T12:01:48Z",
      body: "this is a sample comment how do i look?",
      author: {
        username: "bianca",
      },
      score: 0,
    },
    {
      id: 2,
      createdAt: "2022-05-16T12:01:48Z",
      body: "this is a sample comment TWO how do i look?",
      author: {
        username: "bianca",
      },
      score: 0,
    },
    {
      id: 3,
      createdAt: "2022-05-16T12:01:48Z",
      body: "this is a sample comment THREE how do i look?",
      author: {
        username: "bianca",
      },
      score: 0,
    }
  ],
  score: 0,
  activity: 0,
  author: {
    username: "facinick",
  }
}

export const SnippetWithoutComments = () => {
  return <Snippet snippet={snippet} truncate={false} />
}

export const SnippetTruncated = () => {
  return <Snippet snippet={snippet} truncate={true} />
}

export const SnippetWithComments = () => {
  return <Snippet snippet={snippetWithComments} truncate={false} />
}

export default { title: 'Components/Snippet' }

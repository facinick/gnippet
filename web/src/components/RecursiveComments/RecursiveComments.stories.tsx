import Stack from '@mui/material/Stack'
import { arrayToTree } from '../Comment/CommentTree'
import RecursiveComments from './RecursiveComments'

const comments = [
  {
    id: 1,
    body: 'hello world',
    parentCommentId: null,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
    children: [],
  },
  {
    id: 2,
    body: 'hello world',
    parentCommentId: null,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
    children: [
      {
        id: 5,
        body: 'hello world',
        parentCommentId: 2,
        createdAt: String(Date.now()),
        author: {
          username: 'facinick',
        },
        activity: 0,
        score: 0,
        children: [
          {
            id: 7,
            body: 'hello world',
            parentCommentId: 5,
            createdAt: String(Date.now()),
            author: {
              username: 'facinick',
            },
            activity: 0,
            score: 0,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    body: 'hello world',
    parentCommentId: null,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
    children: [
      {
        id: 6,
        body: 'hello world',
        parentCommentId: 3,
        createdAt: String(Date.now()),
        author: {
          username: 'facinick',
        },
        activity: 0,
        score: 0,
        children: [],
      },
    ],
  },
  {
    id: 4,
    body: 'hello world',
    parentCommentId: null,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
    children: [],
  },
]

const flatComments = [
  {
    id: 1,
    body: 'hello world',
    parentCommentId: null,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
  },
  {
    id: 4,
    body: 'hello world',
    parentCommentId: null,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
  },
  {
    id: 6,
    body: 'hello world',
    parentCommentId: 3,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
  },
  {
    id: 3,
    body: 'hello world',
    parentCommentId: null,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
  },
  {
    id: 2,
    body: 'hello world',
    parentCommentId: null,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
  },
  {
    id: 5,
    body: 'hello world',
    parentCommentId: 2,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
  },
  {
    id: 7,
    body: 'hello world',
    parentCommentId: 5,
    createdAt: String(Date.now()),
    author: {
      username: 'facinick',
    },
    activity: 0,
    score: 0,
  },
]

export const generated = () => {

  return (
    <Stack>
      {arrayToTree(flatComments).map((comment) => {
        return <RecursiveComments comment={comment} />
      })}
    </Stack>
  )
}

export default { title: 'Components/RecursiveComments' }

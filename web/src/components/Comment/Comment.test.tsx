import { render } from '@redwoodjs/testing/web'
import { pastDateString } from '../CreatedAt/CreatedAt.test'

import Comment from './Comment'

export const defaultComment = {
  id: 1,
  body: "this is a sample comment",
  score: 0,
  activity: 0,
  author: {
    id: 1,
    username: 'facinick',
    comments: [{
      id: 1
    }],
  },
  createdAt: pastDateString,
  snippetId: 1,
  authorId: 1,
  snippet: {
    id: 1,
  },
  updatedAt: pastDateString,
  votes: 0,
  comments: []
}


//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Comment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Comment comment={defaultComment} />)
    }).not.toThrow()
  })
})

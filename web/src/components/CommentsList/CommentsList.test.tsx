import { render } from '@redwoodjs/testing/web'

import CommentsList from './CommentsList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CommentsList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentsList />)
    }).not.toThrow()
  })
})

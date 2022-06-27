import { render } from '@redwoodjs/testing/web'

import CommentReplyForm from './CommentReplyForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CommentReplyForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentReplyForm />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import CommentsHeader from './CommentsHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CommentsHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentsHeader />)
    }).not.toThrow()
  })
})

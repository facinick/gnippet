import { render } from '@redwoodjs/testing/web'

import DeleteBookmark from './DeleteBookmark'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DeleteBookmark', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeleteBookmark />)
    }).not.toThrow()
  })
})

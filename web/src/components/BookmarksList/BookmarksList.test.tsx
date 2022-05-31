import { render } from '@redwoodjs/testing/web'

import BookmarksList from './BookmarksList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BookmarksList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BookmarksList />)
    }).not.toThrow()
  })
})

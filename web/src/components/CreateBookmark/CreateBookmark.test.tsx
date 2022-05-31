import { render } from '@redwoodjs/testing/web'

import CreateBookmark from './CreateBookmark'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreateBookmark', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateBookmark />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import Bookmark from './Bookmark'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Bookmark', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Bookmark />)
    }).not.toThrow()
  })
})

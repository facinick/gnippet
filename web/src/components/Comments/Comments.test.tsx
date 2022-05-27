import { render } from '@redwoodjs/testing/web'

import Comments from './Comments'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Comments', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Comments />)
    }).not.toThrow()
  })
})

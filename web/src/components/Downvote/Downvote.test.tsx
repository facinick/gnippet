import { render } from '@redwoodjs/testing/web'

import Downvote from './Downvote'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Downvote', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Downvote />)
    }).not.toThrow()
  })
})

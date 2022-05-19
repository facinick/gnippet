import { render } from '@redwoodjs/testing/web'

import Upvote from './Upvote'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Upvote', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Upvote />)
    }).not.toThrow()
  })
})

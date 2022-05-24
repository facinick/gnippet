import { render } from '@redwoodjs/testing/web'

import UserCell from './UserCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserCell />)
    }).not.toThrow()
  })
})

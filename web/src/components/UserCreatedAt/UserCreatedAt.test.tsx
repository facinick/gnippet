import { render } from '@redwoodjs/testing/web'

import UserCreatedAt from './UserCreatedAt'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserCreatedAt', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserCreatedAt />)
    }).not.toThrow()
  })
})

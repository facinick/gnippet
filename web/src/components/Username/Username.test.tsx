import { render } from '@redwoodjs/testing/web'

import Username from './Username'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Username', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Username />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import CreatedAt from './CreatedAt'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreatedAt', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreatedAt />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import Snippet from './Snippet'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Snippet', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Snippet />)
    }).not.toThrow()
  })
})

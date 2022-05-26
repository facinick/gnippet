import { render } from '@redwoodjs/testing/web'

import DeleteSnippet from './DeleteSnippet'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DeleteSnippet', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeleteSnippet />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import FullSnippetBody from './FullSnippetBody'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FullSnippetBody', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FullSnippetBody />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import CopySnippetUrl from './CopySnippetUrl'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CopySnippetUrl', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CopySnippetUrl />)
    }).not.toThrow()
  })
})

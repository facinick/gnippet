import { render } from '@redwoodjs/testing/web'

import SnippetPage from './SnippetPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SnippetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SnippetPage />)
    }).not.toThrow()
  })
})

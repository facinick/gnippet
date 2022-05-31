import { render } from '@redwoodjs/testing/web'

import SnippetsList from './SnippetsList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SnippetsList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SnippetsList />)
    }).not.toThrow()
  })
})

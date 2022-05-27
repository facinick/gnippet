import { render } from '@redwoodjs/testing/web'

import SnippetTags from './SnippetTags'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SnippetTags', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SnippetTags />)
    }).not.toThrow()
  })
})

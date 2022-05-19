import { render } from '@redwoodjs/testing/web'

import SnippetForm from './SnippetForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SnippetForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SnippetForm />)
    }).not.toThrow()
  })
})

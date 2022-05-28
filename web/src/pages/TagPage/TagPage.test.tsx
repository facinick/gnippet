import { render } from '@redwoodjs/testing/web'

import TagPage from './TagPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TagPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TagPage />)
    }).not.toThrow()
  })
})

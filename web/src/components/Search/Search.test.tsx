import { render } from '@redwoodjs/testing/web'

import Search from './Search'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Search', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Search />)
    }).not.toThrow()
  })
})

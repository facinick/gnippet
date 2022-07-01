import { render } from '@redwoodjs/testing/web'

import RecursiveComments from './RecursiveComments'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecursiveComments', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecursiveComments />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import NumberOfComments from './NumberOfComments'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NumberOfComments', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NumberOfComments />)
    }).not.toThrow()
  })
})

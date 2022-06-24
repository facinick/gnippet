import { render } from '@redwoodjs/testing/web'

import CreatedBy from './CreatedBy'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreatedBy', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreatedBy />)
    }).not.toThrow()
  })
})

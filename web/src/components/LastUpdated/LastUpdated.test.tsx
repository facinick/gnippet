import { render } from '@redwoodjs/testing/web'

import LastUpdated from './LastUpdated'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LastUpdated', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LastUpdated />)
    }).not.toThrow()
  })
})

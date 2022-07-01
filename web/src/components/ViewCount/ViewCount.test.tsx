import { render } from '@redwoodjs/testing/web'

import ViewCount from './ViewCount'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ViewCount', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewCount />)
    }).not.toThrow()
  })
})

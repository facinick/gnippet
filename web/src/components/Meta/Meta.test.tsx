import { render } from '@redwoodjs/testing/web'

import Meta from './Meta'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Meta', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Meta />)
    }).not.toThrow()
  })
})

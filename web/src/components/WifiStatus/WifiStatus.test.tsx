import { render } from '@redwoodjs/testing/web'

import WifiStatus from './WifiStatus'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WifiStatus', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WifiStatus />)
    }).not.toThrow()
  })
})

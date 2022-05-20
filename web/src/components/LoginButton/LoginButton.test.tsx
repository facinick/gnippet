import { render } from '@redwoodjs/testing/web'

import LoginButton from './LoginButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoginButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginButton />)
    }).not.toThrow()
  })
})

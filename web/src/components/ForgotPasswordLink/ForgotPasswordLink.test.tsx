import { render } from '@redwoodjs/testing/web'

import ForgotPasswordLink from './ForgotPasswordLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ForgotPasswordLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ForgotPasswordLink />)
    }).not.toThrow()
  })
})

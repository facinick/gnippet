import { render } from '@redwoodjs/testing/web'

import ForgotPasswordForm from './ForgotPasswordForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ForgotPasswordForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ForgotPasswordForm />)
    }).not.toThrow()
  })
})

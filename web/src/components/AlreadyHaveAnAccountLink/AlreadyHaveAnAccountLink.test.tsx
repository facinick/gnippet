import { render } from '@redwoodjs/testing/web'

import AlreadyHaveAnAccountLink from './AlreadyHaveAnAccountLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AlreadyHaveAnAccountLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AlreadyHaveAnAccountLink />)
    }).not.toThrow()
  })
})

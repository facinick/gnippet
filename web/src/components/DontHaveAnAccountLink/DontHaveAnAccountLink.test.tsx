import { render } from '@redwoodjs/testing/web'

import DontHaveAnAccountLink from './DontHaveAnAccountLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DontHaveAnAccountLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DontHaveAnAccountLink />)
    }).not.toThrow()
  })
})

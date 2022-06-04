import { render } from '@redwoodjs/testing/web'

import ProfileButton from './ProfileButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProfileButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileButton />)
    }).not.toThrow()
  })
})

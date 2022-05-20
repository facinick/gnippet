import { render } from '@redwoodjs/testing/web'

import HomeButton from './HomeButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HomeButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomeButton />)
    }).not.toThrow()
  })
})

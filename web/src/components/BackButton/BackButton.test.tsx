import { render } from '@redwoodjs/testing/web'

import BackButton from './BackButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BackButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BackButton />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import Space from './Space'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Space', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Space />)
    }).not.toThrow()
  })
})

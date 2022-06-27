import { render } from '@redwoodjs/testing/web'

import ReadingTime from './ReadingTime'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReadingTime', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReadingTime />)
    }).not.toThrow()
  })
})

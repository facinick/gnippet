import { render } from '@redwoodjs/testing/web'

import ReadMore from './ReadMore'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReadMore', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReadMore />)
    }).not.toThrow()
  })
})

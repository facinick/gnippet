import { render } from '@redwoodjs/testing/web'

import TagSearchAndAdd from './TagSearchAndAdd'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TagSearchAndAdd', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TagSearchAndAdd />)
    }).not.toThrow()
  })
})

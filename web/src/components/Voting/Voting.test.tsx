import { render } from '@redwoodjs/testing/web'

import Voting from './Voting'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Voting', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Voting score={0} snippetId={0} entity={'COMMENT'} />)
    }).not.toThrow()
  })
})

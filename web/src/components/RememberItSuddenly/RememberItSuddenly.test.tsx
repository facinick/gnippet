import { render } from '@redwoodjs/testing/web'

import RememberItSuddenly from './RememberItSuddenly'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RememberItSuddenly', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RememberItSuddenly />)
    }).not.toThrow()
  })
})

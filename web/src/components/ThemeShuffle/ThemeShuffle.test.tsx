import { render } from '@redwoodjs/testing/web'

import ThemeShuffle from './ThemeShuffle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThemeShuffle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeShuffle />)
    }).not.toThrow()
  })
})

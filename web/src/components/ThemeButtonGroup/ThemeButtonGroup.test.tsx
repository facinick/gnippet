import { render } from '@redwoodjs/testing/web'

import ThemeButtonGroup from './ThemeButtonGroup'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThemeButtonGroup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeButtonGroup />)
    }).not.toThrow()
  })
})

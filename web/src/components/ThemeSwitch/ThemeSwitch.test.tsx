import { render } from '@redwoodjs/testing/web'

import ThemeSwitch from './ThemeSwitch'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThemeSwitch', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeSwitch />)
    }).not.toThrow()
  })
})

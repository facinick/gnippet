import { render } from '@redwoodjs/testing/web'

import GqlMetaComponent from './GqlMetaComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GqlMetaComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GqlMetaComponent />)
    }).not.toThrow()
  })
})

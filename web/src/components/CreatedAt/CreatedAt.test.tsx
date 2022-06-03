import { render } from '@redwoodjs/testing/web'

import CreatedAt from './CreatedAt'

export const pastDateString = new Date('04 February 2022 14:48 UTC').toISOString()
export const nowDateString = new Date().toISOString()
export const futureDateString = new Date('04 February 2023 14:48 UTC').toISOString()

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreatedAt', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreatedAt createdAt={pastDateString} />)
    }).not.toThrow()
  })
})

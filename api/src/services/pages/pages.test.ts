import { pages, page, createPage, updatePage, deletePage } from './pages'
import type { StandardScenario } from './pages.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pages', () => {
  scenario('returns all pages', async (scenario: StandardScenario) => {
    const result = await pages()

    expect(result.length).toEqual(Object.keys(scenario.page).length)
  })

  scenario('returns a single page', async (scenario: StandardScenario) => {
    const result = await page({ id: scenario.page.one.id })

    expect(result).toEqual(scenario.page.one)
  })

  scenario('creates a page', async (scenario: StandardScenario) => {
    const result = await createPage({
      input: {
        name: 'String3411552',
        updatedAt: '2022-05-16T12:01:26Z',
        creatorId: scenario.page.two.creatorId,
      },
    })

    expect(result.name).toEqual('String3411552')
    expect(result.updatedAt).toEqual('2022-05-16T12:01:26Z')
    expect(result.creatorId).toEqual(scenario.page.two.creatorId)
  })

  scenario('updates a page', async (scenario: StandardScenario) => {
    const original = await page({ id: scenario.page.one.id })
    const result = await updatePage({
      id: original.id,
      input: { name: 'String73520812' },
    })

    expect(result.name).toEqual('String73520812')
  })

  scenario('deletes a page', async (scenario: StandardScenario) => {
    const original = await deletePage({ id: scenario.page.one.id })
    const result = await page({ id: original.id })

    expect(result).toEqual(null)
  })
})

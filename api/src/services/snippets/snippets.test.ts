import {
  snippets,
  snippet,
  createSnippet,
  updateSnippet,
  deleteSnippet,
} from './snippets'
import type { StandardScenario } from './snippets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('snippets', () => {
  scenario('returns all snippets', async (scenario: StandardScenario) => {
    const result = await snippets()

    expect(result.length).toEqual(Object.keys(scenario.snippet).length)
  })

  scenario('returns a single snippet', async (scenario: StandardScenario) => {
    const result = await snippet({ id: scenario.snippet.one.id })

    expect(result).toEqual(scenario.snippet.one)
  })

  scenario('creates a snippet', async (scenario: StandardScenario) => {
    const result = await createSnippet({
      input: {
        title: 'String',
        body: 'String',
        authorId: scenario.snippet.two.authorId,
        updatedAt: '2022-05-16T12:01:48Z',
        pageId: scenario.snippet.two.pageId,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.body).toEqual('String')
    expect(result.authorId).toEqual(scenario.snippet.two.authorId)
    expect(result.updatedAt).toEqual('2022-05-16T12:01:48Z')
    expect(result.pageId).toEqual(scenario.snippet.two.pageId)
  })

  scenario('updates a snippet', async (scenario: StandardScenario) => {
    const original = await snippet({ id: scenario.snippet.one.id })
    const result = await updateSnippet({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a snippet', async (scenario: StandardScenario) => {
    const original = await deleteSnippet({ id: scenario.snippet.one.id })
    const result = await snippet({ id: original.id })

    expect(result).toEqual(null)
  })
})

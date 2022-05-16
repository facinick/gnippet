import { requireAuth } from 'src/lib/auth'
import { users, user, createUser, updateUser, deleteUser } from './users'
import type { StandardScenario } from './users.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.nick.id })

    expect(result).toEqual(scenario.user.nick)
  })

  scenario('creates a user', async () => {
    const result = await createUser({
      input: {
        username: 'mancmaur',
        hashedPassword: 'password',
        salt: 'salt',
        isBanned: false,
        roles: 'admin'
      },
    })

    expect(result.username).toEqual('mancmaur')
    expect(result.hashedPassword).toEqual('password')
    expect(result.salt).toEqual('salt')
  })

  scenario('updates a user', async (scenario: StandardScenario) => {

    mockCurrentUser({
      id: scenario.user.bob.id,
      username: scenario.user.bob.username,
      isBanned: false,
      roles: 'admin'
    })

    const original = await user({ id: scenario.user.bob.id })
    const result = await updateUser({
      id: original.id,
      input: { username: 'tamarand' },
    })

    expect(result.username).toEqual('tamarand')
  })

  scenario('deletes a user', async (scenario: StandardScenario) => {

    mockCurrentUser({
      id: scenario.user.nick.id,
      username: scenario.user.nick.username,
      isBanned: false,
      roles: 'admin'
    })

    const original = await deleteUser({ id: scenario.user.nick.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})

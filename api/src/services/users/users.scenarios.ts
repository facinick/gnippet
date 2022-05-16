import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    nick: {
      data: {
        username: 'facinick',
        hashedPassword: 'password',
        salt: 'password',
        isBanned: false,
        roles: 'admin'
      },
    },
    bob: {
      data: {
        username: 'bob11',
        hashedPassword: 'password',
        salt: 'password',
        isBanned: false,
        roles: 'user'
      },
    },
  },
})

export type StandardScenario = typeof standard

import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: 'String9116748',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-05-16T12:04:12Z',
      },
    },
    two: {
      data: {
        username: 'String4740905',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-05-16T12:04:12Z',
      },
    },
  },
})

export type StandardScenario = typeof standard

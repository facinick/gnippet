import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.BookmarkCreateArgs>({
  bookmark: {
    one: {
      data: {
        value: 7578701,
        entityType: 'COMMENT',
        updatedAt: '2022-05-31T08:11:18Z',
        user: {
          create: {
            username: 'String6082385',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-31T08:11:18Z',
          },
        },
      },
    },
    two: {
      data: {
        value: 6411721,
        entityType: 'COMMENT',
        updatedAt: '2022-05-31T08:11:18Z',
        user: {
          create: {
            username: 'String4793283',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-31T08:11:18Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard

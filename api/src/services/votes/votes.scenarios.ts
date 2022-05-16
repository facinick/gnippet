import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.VoteCreateArgs>({
  vote: {
    one: {
      data: {
        type: 'UPVOTE',
        entityType: 'COMMENT',
        updatedAt: '2022-05-16T12:01:12Z',
        user: {
          create: {
            username: 'String1081745',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-16T12:01:12Z',
          },
        },
      },
    },
    two: {
      data: {
        type: 'UPVOTE',
        entityType: 'COMMENT',
        updatedAt: '2022-05-16T12:01:12Z',
        user: {
          create: {
            username: 'String4810540',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-16T12:01:12Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard

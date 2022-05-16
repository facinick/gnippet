import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PageCreateArgs>({
  page: {
    one: {
      data: {
        name: 'String8693451',
        updatedAt: '2022-05-16T12:01:26Z',
        createdBy: {
          create: {
            username: 'String2336868',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-16T12:01:26Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String7845096',
        updatedAt: '2022-05-16T12:01:26Z',
        createdBy: {
          create: {
            username: 'String1870734',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-16T12:01:26Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard

import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.SnippetCreateArgs>({
  snippet: {
    one: {
      data: {
        title: 'String',
        body: 'String',
        updatedAt: '2022-05-16T12:01:48Z',
        author: {
          create: {
            username: 'String2878727',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-16T12:01:48Z',
          },
        },
        page: {
          create: {
            name: 'String6516974',
            updatedAt: '2022-05-16T12:01:48Z',
            createdBy: {
              create: {
                username: 'String6653495',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2022-05-16T12:01:48Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        body: 'String',
        updatedAt: '2022-05-16T12:01:48Z',
        author: {
          create: {
            username: 'String5992348',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-16T12:01:48Z',
          },
        },
        page: {
          create: {
            name: 'String5440641',
            updatedAt: '2022-05-16T12:01:48Z',
            createdBy: {
              create: {
                username: 'String5876232',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2022-05-16T12:01:48Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard

import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: {
        body: 'String',
        author: {
          create: {
            username: 'String7965103',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-16T12:00:58Z',
          },
        },
        snippet: {
          create: {
            title: 'String',
            body: 'String',
            updatedAt: '2022-05-16T12:00:58Z',
            author: {
              create: {
                username: 'String7809049',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2022-05-16T12:00:58Z',
              },
            },
            page: {
              create: {
                name: 'String4757779',
                updatedAt: '2022-05-16T12:00:58Z',
                createdBy: {
                  create: {
                    username: 'String7334051',
                    hashedPassword: 'String',
                    salt: 'String',
                    updatedAt: '2022-05-16T12:00:58Z',
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        body: 'String',
        author: {
          create: {
            username: 'String2337629',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-16T12:00:58Z',
          },
        },
        snippet: {
          create: {
            title: 'String',
            body: 'String',
            updatedAt: '2022-05-16T12:00:58Z',
            author: {
              create: {
                username: 'String3819339',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2022-05-16T12:00:58Z',
              },
            },
            page: {
              create: {
                name: 'String5430787',
                updatedAt: '2022-05-16T12:00:58Z',
                createdBy: {
                  create: {
                    username: 'String6347459',
                    hashedPassword: 'String',
                    salt: 'String',
                    updatedAt: '2022-05-16T12:00:58Z',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard

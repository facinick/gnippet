import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TagCreateArgs>({
  tag: {
    one: { data: { name: 'String', updatedAt: '2022-05-16T12:00:22Z' } },
    two: { data: { name: 'String', updatedAt: '2022-05-16T12:00:22Z' } },
  },
})

export type StandardScenario = typeof standard
